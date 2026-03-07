import { Component, inject, input, signal } from '@angular/core';
import { TravelData } from '../interfaces/travel-data';
import { TravelService } from '../../services/travel-service';
import { TravelType } from '../enums/travel-type';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { form, FormField, required, min, max } from '@angular/forms/signals';
import { HttpErrorResponse } from '@angular/common/http';
import { getErrorMessage } from '../../utils/response';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatTimepickerModule} from '@angular/material/timepicker';
import { MatAnchor, MatButtonModule } from '@angular/material/button';
import { MatOption, MatSelect } from '@angular/material/select';
import { Agency } from '../../models/agency';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { DatePipe } from '@angular/common';
import { futureDateConstraint, rangeDateValidity } from '../../utils/validation-rules';
import { TravelCreateBatchData } from '../interfaces/travel-create-batch-data';
import {MatStepperModule} from '@angular/material/stepper';
import { WeekDays } from '../enums/week-days';
import {MatChipInputEvent, MatChipsModule} from '@angular/material/chips';

@Component({
  selector: 'app-travel-create-by-batch',
  imports: [MatPaginatorModule, MatTableModule, MatFormFieldModule, MatDatepickerModule, MatFormFieldModule, 
  FormsModule, ReactiveFormsModule, MatIconModule, MatButtonModule, MatCardModule, MatCheckboxModule,
  MatSelect, MatOption, FormField, MatTimepickerModule, MatInputModule, MatStepperModule,
  MatChipsModule],    
  templateUrl: './travel-create-by-batch.html',
  styleUrl: './travel-create-by-batch.scss',
})
export class TravelCreateByBatch {
 travelService = inject(TravelService);
  travelModel = signal<TravelCreateBatchData>({ 
    departAgencyId: '',
    arrivalAgencyId: '',
    startDate: new Date(),
    endDate: new Date(),
    travelType: TravelType.CLASSIC,
    travelHours: [],
    days: []
  });
  weekDays = [
    { day: WeekDays.MONDAY, checked: false, label: "Monday"},
    { day: WeekDays.TUESDAY, checked: false, label: "Tuesday"},
    { day: WeekDays.WEDNESDAY, checked: false, label: "Wednesday"},
    { day: WeekDays.THURSDAY, checked: false, label: "Thursday"},
    { day: WeekDays.FRIDAY, checked: false, label: "Friday"},
    { day: WeekDays.SATURDAY, checked: false, label: "Saturday"},
    { day: WeekDays.SUNDAY, checked: false, label: "Sunday"}
  ];

  timeModel = signal({
    time: new Date()
  });

  readonly travelTimes = signal<string[]>([]);

  updateCheck(checked: boolean, index: number) {
    this.weekDays[index].checked = checked;
  }

  addTime() {
    const timeData = this.timeModel().time;
    if (this.travelTimes().indexOf(timeData.toLocaleTimeString()) >= 0)
      return;
    this.travelTimes.update(times => [...times, timeData.toLocaleTimeString()])
  }

  removeTime(timeToRemove: string) {
    this.travelTimes.update(times => {
      const index = times.indexOf(timeToRemove);
      if (index < 0) {
        return times;
      }
      return times.splice(index, 1);
    })
  }

  agencies = input.required<Agency[]>();
  travelTypes = [
    {label: 'CLASSIC', value: TravelType.CLASSIC}, 
    {label: 'VIP', value: TravelType.VIP}
  ]; 

  errorMessage = signal<string|null>(null);

  travelForm = form(this.travelModel, (schema) => { 
    required(schema.departAgencyId, {message: 'Departure agency is required'}); 
    required(schema.arrivalAgencyId, {message: 'Arrival agency is required'});
    required(schema.startDate, {message: 'Start date is required'});
    required(schema.endDate, {message: 'End date is required'});
    rangeDateValidity(schema.startDate, schema.endDate)
    futureDateConstraint(schema.startDate)
  });

  timeForm = form(this.timeModel);

  submit() { 
    const travelData = this.travelModel();
    if (travelData.departAgencyId == travelData.arrivalAgencyId) {
      this.errorMessage.set("You can't travel with the same agency"); 
      return;
    }
    const departCityId = this.agencies().find((val) => val.id == travelData.departAgencyId)!.city.id;
    const arrivalCityId = this.agencies().find((val) => val.id == travelData.arrivalAgencyId)!.city.id;
    if (departCityId == arrivalCityId) {
      this.errorMessage.set("You can't travel within the same city"); 
      return;
    }
    this.travelService.saveBatch(travelData)
    .subscribe({ 
      next: (resp) => {
        this.errorMessage.set(null);
      }, 
      error: (err: HttpErrorResponse) => {
        this.errorMessage.set(getErrorMessage(err)); 
      }}); 
    }
}
