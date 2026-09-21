import { Component, inject, signal } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { form, FormField, required, min, max } from '@angular/forms/signals';
import { BusService } from '../../../services/bus-service';
import { HttpErrorResponse } from '@angular/common/http';
import { MatAnchor } from "@angular/material/button";
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogRef, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { getErrorMessage } from '../../../utils/response';
import { requireNoSpaces, shouldNotStartWithSpace } from '../../../utils/validation-rules';
import { BusData } from '../interfaces/bus-data';
import { MatDivider } from '@angular/material/divider';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { Bus } from '../../../models/bus';

@Component({
  selector: 'app-bus-edit-dialog',
  imports: [MatDialogTitle, MatInputModule, MatFormFieldModule, ReactiveFormsModule,
    MatDivider, FormField, MatAnchor, MatDialogActions, MatDialogContent, MatProgressBarModule],
  templateUrl: './bus-edit-dialog.html',
  styleUrl: './bus-edit-dialog.scss',
})
export class BusEditDialog {

  readonly dialogRef = inject(MatDialogRef<BusEditDialog>);
  private readonly _snackBar = inject(MatSnackBar);
  data = inject<Bus>(MAT_DIALOG_DATA);
  isSubmitting = signal(false);
  busService = inject(BusService);
  busModel = signal<BusData>({ 
    serialNumber: this.data.serialNumber, 
    brand: this.data.brand, 
    capacity: this.data.capacity 
  });
  errorMessage = signal<string|null>(null);

  busForm = form(this.busModel, (schema) => { 
    required(schema.serialNumber, {message: "This field shouldn't be empty"}); 
    requireNoSpaces(schema.serialNumber, {message: "Serial number shouldn't contain spaces"});
    required(schema.brand, {message: "This field shouldn't be empty"}); 
    shouldNotStartWithSpace(schema.brand, {message: "Brand shouldn't start with space"});
    required(schema.capacity, {message: "This field shouldn't be empty"});
    min(schema.capacity, 4, {message: "Capacity must be at least 4"});
    max(schema.capacity, 400, {message: "Capacity must be at most 400"});
  });

  closeDialog() {
    this.dialogRef.close();
  }

  submit() { 
    this.isSubmitting.set(true);
    this.busService.update(this.data.id, this.busModel())
    .subscribe({ 
      next: () => {
        this.isSubmitting.set(false);
        this.errorMessage.set(null);
        this._snackBar.open("Bus edited successfully", "Close");
        this.dialogRef.close(true)
      }, 
      error: (err: HttpErrorResponse) => {
        this.isSubmitting.set(false);
        this.errorMessage.set(getErrorMessage(err)) 
      }}); 
    }

}
