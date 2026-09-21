import { Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {form, FormField, required} from '@angular/forms/signals';
import { shouldNotStartWithSpace } from '../../../utils/validation-rules';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { CityService } from '../../../services/city-service';
import { HttpErrorResponse } from '@angular/common/http';
import { getErrorMessage } from '../../../utils/response';
import { CityData } from '../interfaces/city-data';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-city-form',
  imports: [MatButtonModule, MatCardModule, MatProgressBarModule,
    FormField, MatInputModule, MatFormFieldModule, ReactiveFormsModule],
  templateUrl: './city-form.html',
  styleUrl: './city-form.scss',
})
export class CityForm {

  cityService  = inject(CityService)
  isSubmitting = signal(false);
  private readonly _snackBar = inject(MatSnackBar);
  errorMessage = signal<string | null>(null);
  cityModel = signal<CityData>({
    name: ''
  });

  cityForm = form(this.cityModel, (schemaPath) => {
    required(schemaPath.name, {message: "City name is required"}),
    shouldNotStartWithSpace(schemaPath.name, {message: "City name shouldn't start with space"});
  });

  submit() {
    this.isSubmitting.set(true);
    this.cityService.save(this.cityModel()).subscribe({
      next: () => {
        this.errorMessage.set(null);
        this.isSubmitting.set(false);
        this._snackBar.open("City created successfully", "Close");
      },
      error: (err: HttpErrorResponse) => {
          this.errorMessage.set(getErrorMessage(err));
          this.isSubmitting.set(false);
      }
    });
  }
}
