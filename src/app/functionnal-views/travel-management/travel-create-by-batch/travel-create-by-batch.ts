import { Component, inject, input, signal } from '@angular/core';
import { TravelService } from '../../../services/travel-service';
import { TravelType } from '../enums/travel-type';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { form, FormField, required } from '@angular/forms/signals';
import { HttpErrorResponse } from '@angular/common/http';
import { getErrorMessage } from '../../../utils/response';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatTimepickerModule} from '@angular/material/timepicker';
import { MatButtonModule } from '@angular/material/button';
import { MatOption, MatSelect } from '@angular/material/select';
import { Agency } from '../../../models/agency';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {MatButtonToggleModule} from '@angular/material/button-toggle';

import { DatePipe } from '@angular/common';
import { futureDateConstraint, rangeDateValidity, validateDatetime } from '../../../utils/validation-rules';
import {MatStepperModule} from '@angular/material/stepper';
import { WeekDays } from '../enums/week-days';
import { MatChipsModule} from '@angular/material/chips';
import { TravelDetails } from '../interfaces/travel-details';
import { TravelState } from '../enums/travel-state';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDeleteDialog } from '../../../global/confirm-delete-dialog/confirm-delete-dialog';
import {ScrollingModule} from '@angular/cdk/scrolling';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { TravelPathDetails } from '../../../models/travel-path-details';

@Component({
  selector: 'app-travel-create-by-batch',
  imports: [MatPaginatorModule, MatTableModule, MatFormFieldModule, MatDatepickerModule, MatFormFieldModule, 
  FormsModule, ReactiveFormsModule, MatIconModule, MatButtonModule, MatCardModule, MatCheckboxModule,
  MatSelect, MatOption, FormField, MatTimepickerModule, MatInputModule, MatStepperModule,
  MatChipsModule, MatButtonToggleModule, DatePipe, ScrollingModule, MatProgressBarModule],    
  templateUrl: './travel-create-by-batch.html',
  styleUrl: './travel-create-by-batch.scss',
  providers: [DatePipe],
})
export class TravelCreateByBatch {
  displayedColumns: string[] = ['Depart Agency', 'Arrival Agency', 'Travel type', 'Travel state',
    'Planned depart datetime', 'Ticket price', 'Reservation fees', 'Options'];
  isSubmitting = signal(false);
  private readonly _snackBar = inject(MatSnackBar);
  travelService = inject(TravelService);
  travelModel = signal({ 
    departAgencyId: '',
    travelPathId: '',
    startDate: new Date(),
    endDate: new Date(),
    travelType: TravelType.CLASSIC,
    travelHours: [] as string[],
    days: [] as WeekDays[],
    ticketPrice: 0,
    reservationFees: 0
  });
  travelForm = form(this.travelModel, (schema) => { 
    required(schema.departAgencyId, {message: 'Departure agency is required'}); 
    required(schema.travelPathId, {message: 'Travel path is required'});
    required(schema.startDate, {message: 'Start date is required'});
    validateDatetime(schema.startDate, {message: 'Start date has invalid format'});
    required(schema.endDate, {message: 'End date is required'});
    validateDatetime(schema.endDate, {message: 'End date has invalid format'});
    rangeDateValidity(schema.startDate, schema.endDate)
    futureDateConstraint(schema.startDate)
  });
  travelPaths = input.required<TravelPathDetails[]>();

  readonly deleteDialog = inject(MatDialog);
  travelsCreated =  signal<TravelDetails[]>([]);
  weekDays = [
    { day: WeekDays.MONDAY,  label: "Monday"},
    { day: WeekDays.TUESDAY,  label: "Tuesday"},
    { day: WeekDays.WEDNESDAY,  label: "Wednesday"},
    { day: WeekDays.THURSDAY,  label: "Thursday"},
    { day: WeekDays.FRIDAY,  label: "Friday"},
    { day: WeekDays.SATURDAY,  label: "Saturday"},
    { day: WeekDays.SUNDAY,  label: "Sunday"}
  ];
  
  selectedTravelPath$ = signal<TravelPathDetails|null>(null);

  onTravelPathChange(travelPathId: string) {
    const selectedPath = this.travelPaths().find(path => path.id === travelPathId) || null;
    this.selectedTravelPath$.set(selectedPath);
  }

  timeModel = signal<{ time: Date | null }>({
    time: null
  });

  readonly travelTimes = signal<string[]>([]);

  addTime() {
    const timeData = this.timeModel().time;
    if (timeData == null || this.travelTimes().indexOf(this.formatTime(timeData)) >= 0)
      return;
    this.travelTimes.update(times => [...times, this.formatTime(timeData)]);
    this.timeForm().reset();
  }

  formatTime(time: Date) {
    const hours = time.getHours().toString().padStart(2, '0');
    const minutes = time.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  }

  removeTime(timeToRemove: string) {
    this.travelTimes.update(times => {
      const index = times.indexOf(timeToRemove);
      if (index < 0) {
        return times;
      }
      times.splice(index, 1);
      return times;
    })
  }

  agencies = input.required<Agency[]>();
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
  errorMessage = signal<string|null>(null);



  timeForm = form(this.timeModel, (schema) => {
    required(schema.time, {message: 'This field is required'});
    validateDatetime(schema.time, {message: 'Invalid time format'});
  });

  getAgencyString(id: string): string {
    const agency = this.agencies().find(val => val.id == id);
    return agency ? agency.toString() : 'unknown';
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

  submit() { 
    const travelData = this.travelModel();

    if (this.travelTimes().length == 0){
      this.errorMessage.set("You must add at least one travel time"); 
      return;
    }
    if (travelData.days.length == 0) {
      this.errorMessage.set("You must choose at least one day in the form"); 
      return;     
    }
    
    travelData.travelHours = this.travelTimes();
    const travelsCreateData = { 
      ...travelData, 
      startDate: travelData.startDate.toISOString().split('T')[0],
      endDate: travelData.endDate.toISOString().split('T')[0]  
    };
    this.isSubmitting.set(true);
    this.travelService.saveBatch(travelsCreateData)
    .subscribe({ 
      next: (resp) => {
        this.errorMessage.set(null);
        this.travelsCreated.set(resp.map((travel) => {
          return {
            id: travel.id,
            departAgency: this.getAgencyString(travel.departAgencyId),
            arrivalAgency: this.getAgencyString(travel.arrivalAgencyId),
            travelState: this.travelStates.find(state => state.value == travel.travelState)!.label,
            travelType: this.travelTypes.find(travelTyp => travelTyp.value == travel.travelType)!.label,
            plannedDepartDatetime: travel.plannedDepartDatetime, 
            ticketPrice: travel.ticketPrice,
            reservationFees: travel.reservationFees         
          }
        }));
        this.isSubmitting.set(false);
        this._snackBar.open("Travels batch created successfully", "Close", {duration: 3000});
      }, 
      error: (err: HttpErrorResponse) => {
        this.errorMessage.set(getErrorMessage(err)); 
        this.isSubmitting.set(false);
      }}); 
    }

    performDelete(id: string) {}

}
