import { ChangeDetectionStrategy, Component, inject, input, signal, ViewChild } from '@angular/core';
import { AsyncPipe, DatePipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { catchError, map, of } from 'rxjs';
import { HttpErrorResponse, HttpParams } from '@angular/common/http';
import { getErrorMessage, getErrorType, ResponseState } from '../../utils/response';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDeleteDialog } from '../../global/confirm-delete-dialog/confirm-delete-dialog';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { TravelService } from '../../services/travel-service';
import { TravelType } from '../enums/travel-type';
import { ITravel } from '../interfaces/travel';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { form, FormField, required } from '@angular/forms/signals';
import { TravelDetails } from '../interfaces/travel-details';
import { TravelState } from '../enums/travel-state';
import { Agency } from '../../models/agency';
import { Bus } from '../../models/bus';
import { BusDriver } from '../../models/bus-driver';
import { City } from '../../models/city';
import { MatOption, MatSelect } from '@angular/material/select';
import { MatTimepickerModule } from '@angular/material/timepicker';
import { MatInputModule } from '@angular/material/input';
import { rangeDateValidity } from '../../utils/validation-rules';

@Component({
  selector: 'app-travels-city-city',
  imports: [MatPaginatorModule, MatTableModule, MatFormFieldModule, MatDatepickerModule, MatFormFieldModule, 
    FormsModule, ReactiveFormsModule, MatIconModule, MatButtonModule, MatCardModule, MatCheckboxModule,
  MatSelect, MatOption, FormField, MatTimepickerModule, MatInputModule, DatePipe],  
  templateUrl: './travels-city-city.html',
  styleUrl: './travels-city-city.scss',
  providers: [DatePipe],

})
export class TravelsCityCity {
 displayedColumns: string[] = ['Depart Agency', 'Arrival Agency', 'Travel type', 'Travel state',
     'Planned depart datetime', 'Driver', 'Bus', 'Options'];
  travelService = inject(TravelService);
  pageIndex = 0;         
  pageSize = 10;          
  totalTravels = 0;
  errorMessage = signal<string>('');
  isLoading = signal(true);
  agencies = input.required<Agency[]>();
  buses = input.required<Bus[]>();
  busDrivers = input.required<BusDriver[]>();
  cities = input.required<City[]>();
  datePipe = inject(DatePipe);
  dataSource = new MatTableDataSource<TravelDetails>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit() {
    this.getDatasTravels();
  }
  
  readonly deleteDialog = inject(MatDialog);
  readonly editDialog = inject(MatDialog);
  travelTypes = [
    {label: 'CLASSIC', value: TravelType.CLASSIC}, 
    {label: 'VIP', value: TravelType.VIP}
  ]; 
  travelStates = [
    {label: 'PLANNED', value: TravelState.PLANNED}, 
    {label: 'LOADING', value: TravelState.LOADING}, 
    {label: 'ONGOING', value: TravelState.ONGOING}, 
    {label: 'END', value: TravelState.END}
  ];


  reqParamsModel = signal({
    startDatetime: null,
    endDatetime: null,
    notYetStarted: true,
    travelType: TravelType.CLASSIC,
    fromCity: '',
    toCity: ''
  });

  reqParamsForm = form(this.reqParamsModel, (schema) => {
    required(schema.fromCity!, {message: 'You must choose depart city'});
    required(schema.toCity!, {message: 'You must choose arrival city'});
    rangeDateValidity(schema.startDatetime, schema.endDatetime);
  });

  getDatasTravels() {
    const reqParams = new HttpParams();
    let params = this.reqParamsModel();

    reqParams.set('fromCity', params.fromCity);
    reqParams.set('toCity', params.toCity);
    if (params.startDatetime)
      reqParams.set("startDateTime", this.datePipe.transform(params.startDatetime, 'yyyy-MM-ddTHH:mm:ss')!);
    if (params.endDatetime)
      reqParams.set("endDateTime", this.datePipe.transform(params.endDatetime, 'yyyy-MM-ddTHH:mm:ss')!);
    reqParams.set("pageNumber", this.pageIndex);
    reqParams.set("pageSize", this.pageSize);
    reqParams.set("notYetStarted", params.notYetStarted);
    this.isLoading.set(true);
    
    this.travelService.getTravelsCityToCity(reqParams)
    .subscribe({
      next: (resp) => {
        this.dataSource.data = resp.items.map((travel) => {
          return {
            id: travel.id,
            departAgency: this.getAgencyString(travel.departAgencyId),
            arrivalAgency: this.getAgencyString(travel.arrivalAgencyId),
            bus: travel.busId ? this.getBusString(travel.busId) : '',
            busDriver: travel.busDriverId ? this.getBusDriverString(travel.busDriverId): '',
            travelState: this.travelStates.find(state => state.value == travel.travelState)!.label,
            travelType: this.travelTypes.find(travelTyp => travelTyp.value == travel.travelType)!.label,
            plannedDepartDatetime: travel.plannedDepartDatetime,
            effectiveDepartDatetime: travel.effectiveDepartDatetime,
            arrivalDatetime: travel.arrivalDatetime          
          }
        });
        this.totalTravels = resp.totalCount;
      },
      error: (err: HttpErrorResponse) => {
        this.errorMessage.set(getErrorMessage(err));
      }, 
      complete: () => {
        this.dataSource.paginator = this.paginator;
        this.isLoading.set(false);
      }
    });
  }

  getAgencyString(id: string): string {
    const agency = this.agencies().find(val => val.id == id);
    return agency ? agency.toString() : 'unknown';
  }

  getBusString(id: string) {
    const bus = this.buses().find(val => val.id == id);
    return bus ? bus.toString() : 'unknown';
  }

  getBusDriverString(id: string) {
    const driver = this.busDrivers().find(val => val.id == id);
    return driver ? driver.toString() : 'unknown';
  }

  deleteItem(id: string) { 
    this.deleteDialog.open(ConfirmDeleteDialog, { 
      data: { 
        title: 'Delete Travel', 
        entityName: 'Travel', 
        confirmFn: this.performDelete, 
        objectId: id 
      }
    }); 
  }


  performDelete(id: string) {}

}
