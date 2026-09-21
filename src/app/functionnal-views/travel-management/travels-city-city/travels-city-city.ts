import { ChangeDetectionStrategy, Component, inject, input, signal, ViewChild } from '@angular/core';
import { DatePipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { HttpErrorResponse, HttpParams } from '@angular/common/http';
import { getErrorMessage, getErrorType, ResponseState } from '../../../utils/response';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDeleteDialog } from '../../../global/confirm-delete-dialog/confirm-delete-dialog';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { TravelService } from '../../../services/travel-service';
import { TravelType } from '../enums/travel-type';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { form, FormField, required } from '@angular/forms/signals';
import { TravelDetails } from '../interfaces/travel-details';
import { TravelState } from '../enums/travel-state';
import { Agency } from '../../../models/agency';
import { Bus } from '../../../models/bus';
import { BusDriver } from '../../../models/bus-driver';
import { City } from '../../../models/city';
import { MatOption, MatSelect } from '@angular/material/select';
import { MatTimepickerModule } from '@angular/material/timepicker';
import { MatInputModule } from '@angular/material/input';
import { rangeDateValidity, validateDatetime } from '../../../utils/validation-rules';
import { TravelQuery } from '../interfaces/travel-query';
import { ITravel } from '../interfaces/travel';
import { TravelEditDialog } from '../travel-edit-dialog/travel-edit-dialog';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

@Component({
  selector: 'app-travels-city-city',
  imports: [MatPaginatorModule, MatTableModule, MatFormFieldModule, MatDatepickerModule, MatFormFieldModule, 
    FormsModule, ReactiveFormsModule, MatIconModule, MatButtonModule, MatCardModule, MatCheckboxModule,
  MatSelect, MatOption, FormField, MatTimepickerModule, MatInputModule, DatePipe, MatButtonToggleModule],  
  templateUrl: './travels-city-city.html',
  styleUrl: './travels-city-city.scss',
  providers: [DatePipe],

})
export class TravelsCityCity {
 displayedColumns: string[] = ['Depart Agency', 'Arrival Agency', 'Travel type', 'Travel state', 'Planned depart datetime', 
     'Ticket price', 'Reservation fees', 'Effective depart datetime', 'Arrival datetime', 'Driver', 'Bus', 'Options'];
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
  dataSource = signal<TravelDetails[]>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit() {
    if (this.cities().length >= 2) {
      // this.reqParamsForm.fromCity!().setControlValue(this.cities().at(0)!.id);
      // this.reqParamsForm.toCity!().setControlValue(this.cities().at(1)!.id);
      this.getDatasTravels();
    }
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

  reqParamsModel = signal<TravelQuery>({
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
    validateDatetime(schema.startDatetime, {message: 'Start time has invalid format'});
    validateDatetime(schema.endDatetime, {message: 'End time has invalid format'});
    rangeDateValidity(schema.startDatetime, schema.endDatetime);
  });

  onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getDatasTravels();
  }

  getDatasTravels() {
    const params = this.reqParamsModel();
    let reqParams = new HttpParams()
      .set('fromCity', params.fromCity!)
      .set('toCity', params.toCity!)
      .set("pageNumber", this.pageIndex)
      .set("pageSize", this.pageSize)
      .set("notYetStarted", params.notYetStarted!)
      .set("travelType", params.travelType);
    if (params.startDatetime)
      reqParams = reqParams.append("startDateTime", this.datePipe.transform(params.startDatetime, 'yyyy-MM-ddTHH:mm:ss')!);
    if (params.endDatetime)
      reqParams = reqParams.append("endDateTime", this.datePipe.transform(params.endDatetime, 'yyyy-MM-ddTHH:mm:ss')!);

    this.isLoading.set(true);
    
    this.travelService.getTravelsCityToCity(reqParams)
    .subscribe({
      next: (resp) => {
        this.dataSource.set(resp.items.map((travel) => {
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
            arrivalDatetime: travel.arrivalDatetime,
            ticketPrice: travel.ticketPrice,
            reservationFees: travel.reservationFees,
            travelItem: travel
          }
        }));
        this.totalTravels = resp.totalCount;
      },
      error: (err: HttpErrorResponse) => {
        this.errorMessage.set(getErrorMessage(err));
      }, 
      complete: () => {
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

  editItem(item: ITravel) { 
    this.editDialog.open(TravelEditDialog, { 
      data: {
        travelData: item,
        agencies: this.agencies(),
        buses: this.buses(),
        busDrivers: this.busDrivers()
      } 
    }); 
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

  loadDatas() {
    this.pageIndex = 0;
    this.getDatasTravels();
  }

  performDelete(id: string) {}

}
