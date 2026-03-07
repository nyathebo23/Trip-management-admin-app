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

@Component({
  selector: 'app-bus-form',
  imports: [MatCardModule, MatInputModule, MatFormFieldModule, ReactiveFormsModule, FormField, MatAnchor],
  templateUrl: './bus-form.html',
  styleUrl: './bus-form.scss',
})
export class BusForm {
  busService = inject(BusService);
  busModel = signal<BusData>({ 
    serialNumber: '', 
    brand: '', 
    capacity: 0 
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

  submit() { 
    this.busService.save(this.busModel())
    .subscribe({ 
      next: (res) => {
        this.errorMessage.set(null);
      }, 
      error: (err: HttpErrorResponse) => {
        this.errorMessage.set(getErrorMessage(err)); 
      }}); 
    }
}