import { Component, inject, input, signal } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogRef, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatAnchor } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TravelPathService } from '../../../services/travel-path-service';
import { TravelPathUpdateData } from '../interfaces/travel-path-update-data';
import { form, FormField, max, min, required } from '@angular/forms/signals';
import { HttpErrorResponse } from '@angular/common/http';
import { getErrorMessage } from '../../../utils/response';
import { MatDivider } from '@angular/material/divider';
import { MatTimepickerModule } from '@angular/material/timepicker';
import { TravelPathDetails } from '../../../models/travel-path-details';

@Component({
  selector: 'app-travel-path-edit-dialog',
  imports: [MatDialogTitle, MatInputModule, MatFormFieldModule, ReactiveFormsModule, MatTimepickerModule,
    MatDivider, FormField, MatAnchor, MatDialogActions, MatDialogContent, MatProgressBarModule],  
    templateUrl: './travel-path-edit-dialog.html',
  styleUrl: './travel-path-edit-dialog.scss',
})
export class TravelPathEditDialog {
  readonly dialogRef = inject(MatDialogRef<TravelPathEditDialog>);
  private readonly _snackBar = inject(MatSnackBar);
  data = inject<TravelPathDetails>(MAT_DIALOG_DATA);
  travelPathService = inject(TravelPathService);
  isSubmitting = signal(false);

  travelPathModel = signal({ 
    distance: this.data.distance,
    estimatedTravelDuration: {
      hours: this.data.estimatedTravelDuration.hours,
      minutes: this.data.estimatedTravelDuration.minutes
    }  
  });
  errorMessage = signal<string|null>(null);

  travelPathForm = form(this.travelPathModel, (schema) => { 
    min(schema.distance, 20, {message: "Distance must be at least 20 km"});
    max(schema.distance, 2000, {message: "Distance must be at most 2000 km"});
    min(schema.estimatedTravelDuration.hours, 0, {message: "Estimated travel duration hours must be at least 0"});
    max(schema.estimatedTravelDuration.hours, 23, {message: "Estimated travel duration hours must be at most 23"});
    min(schema.estimatedTravelDuration.minutes, 0, {message: "Estimated travel duration minutes must be at least 0"});
    max(schema.estimatedTravelDuration.minutes, 59, {message: "Estimated travel duration minutes must be at most 59"});
    required(schema.estimatedTravelDuration, {message: 'Estimated travel time is required'});
  });

  closeDialog() {
    this.dialogRef.close();
  }

  submit() { 
    const travelPathData = this.travelPathModel();
    const h = String(travelPathData.estimatedTravelDuration.hours).padStart(2, '0');
    const m = String(travelPathData.estimatedTravelDuration.minutes).padStart(2, '0');
    const travelPathDataToSubmit: TravelPathUpdateData = {
      distance: travelPathData.distance,
      estimatedTravelDuration: `${h}:${m}:00`
    };
    this.isSubmitting.set(true);
    this.travelPathService.update(this.data.id, travelPathDataToSubmit)
    .subscribe({ 
      next: () => {
        this.isSubmitting.set(false);
        this.errorMessage.set(null);
        this._snackBar.open("Travel path updated successfully", "Close");
      }, 
      error: (err: HttpErrorResponse) => {
        this.isSubmitting.set(false);
        this.errorMessage.set(getErrorMessage(err)); 
      }}); 
    }

}
