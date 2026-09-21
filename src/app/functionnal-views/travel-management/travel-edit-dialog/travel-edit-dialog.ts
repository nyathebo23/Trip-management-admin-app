import { Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { form, FormField, required } from '@angular/forms/signals';
import { MatAnchor } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatDivider } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TravelType } from '../enums/travel-type';

import { TravelService } from '../../../services/travel-service';
import { TravelUpdateDialogData } from '../interfaces/travel-update-dialog-data';
import { MatOption, MatSelect } from '@angular/material/select';
import { MatTimepickerModule } from '@angular/material/timepicker';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { TravelData } from '../interfaces/travel-data';
import { HttpErrorResponse } from '@angular/common/http';
import { getErrorMessage } from '../../../utils/response';
import { futureDateConstraint, validateDatetime } from '../../../utils/validation-rules';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { TravelPathDetails } from '../../../models/travel-path-details';

@Component({
  selector: 'app-travel-edit-dialog',
  imports: [MatInputModule, MatFormFieldModule, ReactiveFormsModule, MatSelect, MatOption,
    FormField, MatAnchor, MatDivider, MatDialogActions, MatDialogContent, MatDatepickerModule,
   MatTimepickerModule, MatDialogTitle, MatProgressBarModule ],  
  templateUrl: './travel-edit-dialog.html',
  styleUrl: './travel-edit-dialog.scss',
})
export class TravelEditDialog {
  readonly dialogRef = inject(MatDialogRef<TravelEditDialog>);
  isSubmitting = signal(false);
  private readonly _snackBar = inject(MatSnackBar);
  data = inject<TravelUpdateDialogData>(MAT_DIALOG_DATA);
  travelService = inject(TravelService);
  travelModel = signal<TravelData>({ 
    departAgencyId: this.data.travelData.departAgencyId,
    travelPathId: this.data.travelData.travelPathId,
    busId: this.data.travelData.busId,
    busDriverId: this.data.travelData.busDriverId,
    plannedDepartDatetime: this.data.travelData.plannedDepartDatetime, 
    travelType: this.data.travelData.travelType,
    ticketPrice: this.data.travelData.ticketPrice,
    reservationFees: this.data.travelData.reservationFees
  });

  travelTypes = [
    {label: 'CLASSIC', value: TravelType.CLASSIC}, 
    {label: 'VIP', value: TravelType.VIP}
  ]; 

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
    const selectedPath = this.data.travelPaths.find(path => path.id === travelPathId) || null;
    this.selectedTravelPath$.set(selectedPath);
  }
  

  closeDialog() {
    this.dialogRef.close();
  }

  submit() { 
    const travelData = this.travelModel();
    this.isSubmitting.set(true);
    this.travelService.update(this.data.travelData.id, this.travelModel())
    .subscribe({ 
      next: () => {
        this.isSubmitting.set(false);
        this.errorMessage.set(null);
        this._snackBar.open("Travel edited successfully", "Close", {duration: 3000});
      }, 
      error: (err: HttpErrorResponse) => {
        this.isSubmitting.set(false);
        this.errorMessage.set(getErrorMessage(err)); 
      }}); 
    }
}
