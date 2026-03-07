import { Component, inject, input, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { form, FormField, required } from '@angular/forms/signals';
import { AgencyService } from '../../services/agency-service';
import { HttpErrorResponse } from '@angular/common/http';
import { MatAnchor } from "@angular/material/button";
import { MatSelect, MatOption } from "@angular/material/select";
import { getErrorMessage } from '../../utils/response';
import { ICity } from '../../city-management/interfaces/icity';

@Component({
  selector: 'app-agency-form',
  imports: [MatCardModule, MatInputModule, MatFormFieldModule, ReactiveFormsModule, FormField, MatAnchor, MatSelect, MatOption],
  templateUrl: './agency-form.html',
  styleUrl: './agency-form.scss',
})
export class AgencyForm {
  
  cities = input.required<ICity[]>();
  agencyService = inject(AgencyService);
  agencyModel = signal<AgencyData>({ 
    locationDesc: '', 
    quarter: '', 
    city: '' 
  });
  errorMessage = signal<string|null>(null);
  agencyForm = form(this.agencyModel, (schema) => {
    required(schema.locationDesc, { message: 'Location required' });
    required(schema.quarter, { message: 'Quarter required' });
    required(schema.city, { message: 'City required' });
  });

  submit() {
    this.agencyService.save(this.agencyModel())
    .subscribe({ 
      next: () => {
        this.errorMessage.set(null);
      }, 
      error: (err: HttpErrorResponse) => {
          this.errorMessage.set(getErrorMessage(err));
      }});
  }
}
