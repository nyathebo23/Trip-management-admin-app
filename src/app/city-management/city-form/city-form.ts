import { Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {form, FormField, required} from '@angular/forms/signals';
import { shouldNotStartWithSpace } from '../../utils/validation-rules';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { CityService } from '../../services/city-service';
import { HttpErrorResponse } from '@angular/common/http';
import { getErrorMessage } from '../../utils/response';
import { CityData } from '../interfaces/city-data';

@Component({
  selector: 'app-city-form',
  imports: [MatButtonModule, MatCardModule,
    FormField, MatInputModule, MatFormFieldModule, ReactiveFormsModule],
  templateUrl: './city-form.html',
  styleUrl: './city-form.scss',
})
export class CityForm {

  cityService  = inject(CityService)
  errorMessage = signal<string | null>(null);
  cityModel = signal<CityData>({
    name: ''
  });

  cityForm = form(this.cityModel, (schemaPath) => {
    required(schemaPath.name, {message: "City name is required"}),
    shouldNotStartWithSpace(schemaPath.name, {message: "City name shouldn't start with space"});
  });

  submit() {
    this.cityService.save(this.cityModel()).subscribe({
      next: (res) => {
        this.errorMessage.set(null);
      },
      error: (err: HttpErrorResponse) => {
          this.errorMessage.set(getErrorMessage(err));
      }
    });
  }
}
