import { Component, inject, input, signal } from '@angular/core';
import { TravelPathService } from '../../../services/travel-path-service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TravelPathData } from '../interfaces/travel-path-data';
import { form, FormField, max, min, required } from '@angular/forms/signals';
import { HttpErrorResponse } from '@angular/common/http';
import { getErrorMessage } from '../../../utils/response';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatAnchor } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { Agency } from '../../../models/agency';
import { MatOption, MatSelect } from '@angular/material/select';
import { MatTimepickerModule } from '@angular/material/timepicker';



@Component({
  selector: 'app-travel-path-form',
  imports: [MatCardModule, MatInputModule, MatFormFieldModule, ReactiveFormsModule, MatTimepickerModule,
    FormField, MatAnchor, MatProgressBarModule, MatSelect, MatOption],  
  templateUrl: './travel-path-form.html',
  styleUrl: './travel-path-form.scss',
})
export class TravelPathForm {
  travelPathService = inject(TravelPathService);
  isSubmitting = signal(false);
  private readonly _snackBar = inject(MatSnackBar);
  agencies = input.required<Agency[]>();

  travelPathModel = signal({ 
    agency1Id: '',
    agency2Id: '',
    distance: 0,
    estimatedTravelDuration: {
      hours: 0,
      minutes: 0
    }
  });
  errorMessage = signal<string|null>(null);

  travelPathForm = form(this.travelPathModel, (schema) => { 

    required(schema.agency1Id, {message: 'First agency is required'});
    required(schema.agency2Id, {message: 'Second agency is required'});
    min(schema.distance, 20, {message: "Distance must be at least 20 km"});
    max(schema.distance, 2000, {message: "Distance must be at most 2000 km"});
    min(schema.estimatedTravelDuration.hours, 0, {message: "Estimated travel duration hours must be at least 0"});
    max(schema.estimatedTravelDuration.hours, 23, {message: "Estimated travel duration hours must be at most 23"});
    min(schema.estimatedTravelDuration.minutes, 0, {message: "Estimated travel duration minutes must be at least 0"});
    max(schema.estimatedTravelDuration.minutes, 59, {message: "Estimated travel duration minutes must be at most 59"});
    required(schema.estimatedTravelDuration, {message: 'Estimated travel time is required'});
  });

  submit() { 
    const travelPathData = this.travelPathModel();
    if (travelPathData.agency1Id == travelPathData.agency2Id) {
      this.errorMessage.set("The agencies you choose must be different"); 
      return;
    }
    const departCityId = this.agencies().find((val) => val.id == travelPathData.agency1Id)!.city.id;
    const arrivalCityId = this.agencies().find((val) => val.id == travelPathData.agency2Id)!.city.id;
    if (departCityId == arrivalCityId) {
      this.errorMessage.set("The agencies you choose must be in different cities"); 
      return;
    }
    this.isSubmitting.set(true);
    const h = String(travelPathData.estimatedTravelDuration.hours).padStart(2, '0');
    const m = String(travelPathData.estimatedTravelDuration.minutes).padStart(2, '0');
    const travelPathDataToSubmit: TravelPathData = {
      agency1Id: travelPathData.agency1Id,
      agency2Id: travelPathData.agency2Id,
      distance: travelPathData.distance,
      estimatedTravelDuration: `${h}:${m}:00`
    };
    this.travelPathService.save(travelPathDataToSubmit)
    .subscribe({ 
      next: () => {
        this.isSubmitting.set(false);
        this.errorMessage.set(null);
        this._snackBar.open("Travel path created successfully", "Close");
      }, 
      error: (err: HttpErrorResponse) => {
        this.isSubmitting.set(false);
        this.errorMessage.set(getErrorMessage(err)); 
      }}); 
    }

}
