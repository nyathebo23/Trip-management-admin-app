import { Component, inject, input, signal } from '@angular/core';
import { TravelData } from '../interfaces/travel-data';
import { TravelService } from '../../../services/travel-service';
import { TravelType } from '../enums/travel-type';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { form, FormField, required, min, max } from '@angular/forms/signals';
import { HttpErrorResponse } from '@angular/common/http';
import { getErrorMessage } from '../../../utils/response';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatTimepickerModule} from '@angular/material/timepicker';
import { MatAnchor } from '@angular/material/button';
import { MatOption, MatSelect } from '@angular/material/select';
import { Agency } from '../../../models/agency';
import { Bus } from '../../../models/bus';
import { BusDriver } from '../../../models/bus-driver';
import { futureDateConstraint, validateDatetime } from '../../../utils/validation-rules';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { TravelPathDetails } from '../../../models/travel-path-details';

@Component({
  selector: 'app-travel-form',
  imports: [MatCardModule, MatInputModule, MatFormFieldModule, ReactiveFormsModule, MatProgressBarModule,
    FormField, MatAnchor, MatSelect, MatOption, MatDatepickerModule, MatTimepickerModule],
  templateUrl: './travel-form.html',
  styleUrl: './travel-form.scss',
})
export class TravelForm {
  isSubmitting = signal(false);
  private readonly _snackBar = inject(MatSnackBar);
  travelService = inject(TravelService);
  travelModel = signal<TravelData>({ 
    departAgencyId: '',
    travelPathId: '',
    busId: null,
    busDriverId: null,
    plannedDepartDatetime: new Date(), 
    travelType: TravelType.CLASSIC,
    ticketPrice: 0,
    reservationFees: 0
  });
  travelPaths = input.required<TravelPathDetails[]>();
  buses = input.required<Bus[]>();
  busDrivers = input.required<BusDriver[]>();
  travelTypes = [{label: 'CLASSIC', value: TravelType.CLASSIC}, {label: 'VIP', value: TravelType.VIP}]; 

  errorMessage = signal<string|null>(null);

  travelForm = form(this.travelModel, (schema) => { 
    required(schema.departAgencyId, {message: 'Departure agency is required'}); 
    required(schema.travelPathId, {message: 'Travel path is required'});
    required(schema.plannedDepartDatetime, {message: 'Departure datetime is required'});
    futureDateConstraint(schema.plannedDepartDatetime),
    validateDatetime(schema.plannedDepartDatetime, {message: 'Invalid date or time format'});
  });

  selectedTravelPath$ = signal<TravelPathDetails|null>(null);

  onTravelPathChange(travelPathId: string) {
    const selectedPath = this.travelPaths().find(path => path.id === travelPathId) || null;
    this.selectedTravelPath$.set(selectedPath);
  }
  submit() { 
    const travelData = this.travelModel();
    this.isSubmitting.set(true);
    this.travelService.save(travelData)
    .subscribe({ 
      next: () => {
        this.errorMessage.set(null);
        this.isSubmitting.set(false);
        this._snackBar.open("Travel created successfully", "Close", {duration: 3000});
      }, 
      error: (err: HttpErrorResponse) => {
        this.errorMessage.set(getErrorMessage(err)); 
        this.isSubmitting.set(false);
      }}); 
    }
}
