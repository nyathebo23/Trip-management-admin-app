import { Component, inject, input, signal } from '@angular/core';
import { TravelData } from '../interfaces/travel-data';
import { TravelService } from '../../services/travel-service';
import { TravelType } from '../enums/travel-type';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { form, FormField, required, min, max } from '@angular/forms/signals';
import { HttpErrorResponse } from '@angular/common/http';
import { getErrorMessage } from '../../utils/response';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatTimepickerModule} from '@angular/material/timepicker';
import { MatAnchor } from '@angular/material/button';
import { MatOption, MatSelect } from '@angular/material/select';
import { Agency } from '../../models/agency';
import { Bus } from '../../models/bus';
import { BusDriver } from '../../models/bus-driver';
import { futureDateConstraint } from '../../utils/validation-rules';

@Component({
  selector: 'app-travel-form',
  imports: [MatCardModule, MatInputModule, MatFormFieldModule, ReactiveFormsModule, 
    FormField, MatAnchor, MatSelect, MatOption, MatDatepickerModule, MatTimepickerModule],
  templateUrl: './travel-form.html',
  styleUrl: './travel-form.scss',
})
export class TravelForm {
  travelService = inject(TravelService);
  travelModel = signal<TravelData>({ 
    departAgencyId: '',
    arrivalAgencyId: '',
    busId: null,
    busDriverId: null,
    plannedDepartDatetime: new Date(), 
    travelType: TravelType.CLASSIC
  });
  agencies = input.required<Agency[]>();
  buses = input.required<Bus[]>();
  busDrivers = input.required<BusDriver[]>();
  travelTypes = [{label: 'CLASSIC', value: TravelType.CLASSIC}, {label: 'VIP', value: TravelType.VIP}]; 

  errorMessage = signal<string|null>(null);

  travelForm = form(this.travelModel, (schema) => { 
    required(schema.departAgencyId, {message: 'Departure agency is required'}); 
    required(schema.arrivalAgencyId, {message: 'Arrival agency is required'});
    required(schema.plannedDepartDatetime, {message: 'Departure datetime is required'});
    futureDateConstraint(schema.plannedDepartDatetime)
  });

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
    this.travelService.save(travelData)
    .subscribe({ 
      next: () => {
        this.errorMessage.set(null);
      }, 
      error: (err: HttpErrorResponse) => {
        this.errorMessage.set(getErrorMessage(err)); 
      }}); 
    }
}
