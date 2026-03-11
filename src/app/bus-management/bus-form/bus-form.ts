import { Component, inject, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { form, FormField, required, min, max } from '@angular/forms/signals';
import { BusService } from '../../services/bus-service';
import { HttpErrorResponse } from '@angular/common/http';
import { MatAnchor } from "@angular/material/button";
import { getErrorMessage } from '../../utils/response';
import { requireNoSpaces, shouldNotStartWithSpace } from '../../utils/validation-rules';
import { BusData } from '../interfaces/bus-data';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-bus-form',
  imports: [MatCardModule, MatInputModule, MatFormFieldModule, ReactiveFormsModule, 
    FormField, MatAnchor, MatProgressBarModule],
  templateUrl: './bus-form.html',
  styleUrl: './bus-form.scss',
})
export class BusForm {
  busService = inject(BusService);
  isSubmitting = signal(false);
  private readonly _snackBar = inject(MatSnackBar);

  busModel = signal<BusData>({ 
    serialNumber: '', 
    brand: '', 
    capacity: 0 
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

  submit() { 
    this.isSubmitting.set(true);
    this.busService.save(this.busModel())
    .subscribe({ 
      next: () => {
        this.isSubmitting.set(false);
        this.errorMessage.set(null);
        this._snackBar.open("Bus created successfully", "Close");
      }, 
      error: (err: HttpErrorResponse) => {
        this.isSubmitting.set(false);
        this.errorMessage.set(getErrorMessage(err)); 
      }}); 
    }
}