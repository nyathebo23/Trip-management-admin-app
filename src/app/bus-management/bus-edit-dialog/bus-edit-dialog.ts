import { Component, inject, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule, MatFormField, MatLabel } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { form, FormField, required, min, max } from '@angular/forms/signals';
import { BusService } from '../../services/bus-service';
import { HttpErrorResponse } from '@angular/common/http';
import { MatAnchor } from "@angular/material/button";
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogRef, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { getErrorMessage } from '../../utils/response';
import { requireNoSpaces, shouldNotStartWithSpace } from '../../utils/validation-rules';
import { IBus } from '../interfaces/ibus';
import { BusData } from '../interfaces/bus-data';
import { MatDivider } from '@angular/material/divider';

@Component({
  selector: 'app-bus-edit-dialog',
  imports: [MatDialogTitle, MatInputModule, MatFormFieldModule, ReactiveFormsModule,
    MatDivider, FormField, MatAnchor, MatDialogActions, MatDialogContent],
  templateUrl: './bus-edit-dialog.html',
  styleUrl: './bus-edit-dialog.scss',
})
export class BusEditDialog {
  readonly dialogRef = inject(MatDialogRef<BusEditDialog>);
  data = inject<IBus>(MAT_DIALOG_DATA);
  busService = inject(BusService);
  busModel = signal<BusData>({ 
    serialNumber: this.data.serialNumber, 
    brand: this.data.brand, 
    capacity: this.data.capacity 
  });
  errorMessage = signal<string|null>(null);

  busForm = form(this.busModel, (schema) => { 
    required(schema.serialNumber); 
    requireNoSpaces(schema.serialNumber, {message: "Serial number shouldn't contain spaces"});
    required(schema.brand); 
    shouldNotStartWithSpace(schema.brand, {message: "Brand shouldn't start with space"});
    required(schema.capacity);
    min(schema.capacity, 4, {message: "Capacity must be at least 4"});
    max(schema.capacity, 400, {message: "Capacity must be at most 400"});
  });

  closeDialog() {
    this.dialogRef.close();
  }

  submit() { 
    this.busService.update(this.data.id, this.busModel())
    .subscribe({ 
      next: () => {
        this.errorMessage.set(null);
        this.dialogRef.close(true)
      }, 
      error: (err: HttpErrorResponse) => {
        this.errorMessage.set(getErrorMessage(err)) 
      }}); 
    }

}
