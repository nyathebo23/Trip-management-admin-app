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
import { TravelService } from '../../../services/travel-service';
import { TravelType } from '../enums/travel-type';
import { ITravel } from '../interfaces/travel';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { form, FormField, required } from '@angular/forms/signals';
import { TravelQuery } from '../interfaces/travel-query';
import { TravelEditDialog } from '../travel-edit-dialog/travel-edit-dialog';
import { Agency } from '../../../models/agency';
import { Bus } from '../../../models/bus';
import { BusDriver } from '../../../models/bus-driver';
import { TravelDetails } from '../interfaces/travel-details';
import { MatOption, MatSelect } from '@angular/material/select';
import { MatTimepickerModule } from '@angular/material/timepicker';
import { TravelState } from '../enums/travel-state';
import { MatInputModule } from '@angular/material/input';
import { rangeDateValidity, validateDatetime } from '../../../utils/validation-rules';

@Component({
  selector: 'app-schedule-travels-table',
  imports: [MatPaginatorModule, MatTableModule, MatDatepickerModule, MatFormFieldModule, 
    FormsModule, ReactiveFormsModule, MatIconModule, MatButtonModule, MatCardModule,
  MatSelect, MatOption, FormField, MatTimepickerModule, MatInputModule, DatePipe],
  templateUrl: './schedule-travels-table.html',
  styleUrl: './schedule-travels-table.scss',
  providers: [DatePipe],
})
export class ScheduleTravelsTable {
  displayedColumns: string[] = ['Depart Agency', 'Arrival Agency', 'Travel type', 'Travel state',
     'Planned depart datetime', 'Driver', 'Bus', 'Ticket price', 'Reservation fees', 'Options'];
  travelService = inject(TravelService);

  pageIndex = 0;         
  pageSize = 10;          
  totalTravels = 0;
  errorMessage = signal<string>('');
  isLoading = signal(true);
  agencies = input.required<Agency[]>();
  buses = input.required<Bus[]>();
  busDrivers = input.required<BusDriver[]>();
  datePipe = inject(DatePipe);
  dataSource = signal<TravelDetails[]>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit() {
    if (this.agencies().length > 0) {
      //this.reqParamsForm.departAgency!().setControlValue(this.agencies().at(0)!.id);
      this.getDatasTravels();
    }
  }

  onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
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

  reqParamsModel = signal<TravelQuery>({
    startDatetime: null,
    endDatetime: null,
    travelType: TravelType.CLASSIC,
    departAgency: ''
  });

  reqParamsForm = form(this.reqParamsModel, (schema) => {
    required(schema.departAgency!, {message: 'You must choose depart agency'});
    validateDatetime(schema.startDatetime, {message: 'Start time has invalid format'});
    validateDatetime(schema.endDatetime, {message: 'End time has invalid format'});
    rangeDateValidity(schema.startDatetime, schema.endDatetime);
  });

  getDatasTravels() {

    const params = this.reqParamsModel();
    let reqParams = new HttpParams()
    .set("pageNumber", this.pageIndex)
    .set("pageSize", this.pageSize)
    .set("travelType", params.travelType);
    if (params.startDatetime)
      reqParams = reqParams.append("startDateTime", this.datePipe.transform(params.startDatetime, 'yyyy-MM-ddTHH:mm:ss')!);
    if (params.endDatetime)
      reqParams = reqParams.append("endDateTime", this.datePipe.transform(params.endDatetime, 'yyyy-MM-ddTHH:mm:ss')!);

    this.isLoading.set(true);
    
    this.travelService.getFutureTravelsByDepartAgencyId(params.departAgency! , reqParams)
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

  loadDatas() {
    this.pageIndex = 0;
    this.getDatasTravels();
  }

  performDelete(id: string) {}

}
