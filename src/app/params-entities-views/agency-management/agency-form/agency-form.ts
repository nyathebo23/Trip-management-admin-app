import { Component, inject, input, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { form, FormField, required } from '@angular/forms/signals';
import { AgencyService } from '../../../services/agency-service';
import { HttpErrorResponse } from '@angular/common/http';
import { MatAnchor } from "@angular/material/button";
import { MatSelect, MatOption } from "@angular/material/select";
import { getErrorMessage } from '../../../utils/response';
import { ICity } from '../../city-management/interfaces/icity';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-agency-form',
  imports: [MatCardModule, MatInputModule, MatFormFieldModule, MatProgressBarModule,
    ReactiveFormsModule, FormField, MatAnchor, MatSelect, MatOption],
  templateUrl: './agency-form.html',
  styleUrl: './agency-form.scss',
})
export class AgencyForm {
  
  cities = input.required<ICity[]>();
  private readonly _snackBar = inject(MatSnackBar);
  isSubmitting = signal(false);
  agencyService = inject(AgencyService);
  agencyModel = signal<AgencyData>({ 
    locationDesc: '', 
    quarter: '', 
    cityId: '' 
  });
  errorMessage = signal<string|null>(null);
  agencyForm = form(this.agencyModel, (schema) => {
    required(schema.locationDesc, { message: 'Location required' });
    required(schema.quarter, { message: 'Quarter required' });
    required(schema.cityId, { message: 'City required' });
  });

  submit() {
    this.isSubmitting.set(true);
    this.agencyService.save(this.agencyModel())
    .subscribe({ 
      next: () => {
        this.isSubmitting.set(false);
        this.errorMessage.set(null);
        this._snackBar.open("Agency agent created successfully", "Close");
      }, 
      error: (err: HttpErrorResponse) => {
          this.isSubmitting.set(false);
          this.errorMessage.set(getErrorMessage(err));
      }});
  }
}
