import { Component, inject, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { form, FormField, required } from '@angular/forms/signals';
import { MatAnchor } from '@angular/material/button';
import { HttpErrorResponse } from '@angular/common/http';
import { passwordsShouldmatch, requireDigit, requireLowercase, requireNonAlphanumeric, 
  requireNoSpaces, requireUppercase,  shouldBeAlphanumeric, shouldStartWithLetter, 
  shouldNotStartWithSpace, 
  minLength} from '../../../utils/validation-rules';
import { getErrorMessage } from '../../../utils/response';
import { BusDriverService } from '../../../services/bus-driver-service';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-bus-driver-form',
  imports: [MatCardModule, MatInputModule, MatFormFieldModule, ReactiveFormsModule, FormField, MatAnchor,
    MatProgressBarModule
  ],
  templateUrl: './bus-driver-form.html',
  styleUrl: './bus-driver-form.scss',
})
export class BusDriverForm {
  busDriverService = inject(BusDriverService);
  isSubmitting = signal(false);
  private readonly _snackBar = inject(MatSnackBar);
  busDriverModel = signal({ 
    firstname: '', 
    lastname: '', 
    username: '', 
    password: '',
    confirmPassword: ''
  });
  errorMessage = signal<string|null>(null);

  busDriverForm = form(this.busDriverModel, (schema) => { 
    required(schema.username, { message: "Username shouldn't be empty" }); 
    shouldBeAlphanumeric(schema.username);
    shouldStartWithLetter(schema.username);
    minLength(schema.username, 8, {message: "Username must be at least 8 characters long"});
    shouldNotStartWithSpace(schema.firstname, {message: "First name shouldn't start with space"});
    required(schema.lastname, { message: "Last name shouldn't be empty" }); 
    shouldNotStartWithSpace(schema.lastname, {message: "Last name shouldn't start with space"});
    required(schema.password, { message: "Password shouldn't be empty" });
    requireNoSpaces(schema.password, {message: "Password must not contain spaces"});
    minLength(schema.password, 12, {message: "Password must be at least 12 characters long"});
    requireDigit(schema.password);
    requireLowercase(schema.password);
    requireUppercase(schema.password);
    requireNonAlphanumeric(schema.password);
    passwordsShouldmatch(schema.confirmPassword, schema.password);
  });

  submit() { 
    this.isSubmitting.set(true);
    this.busDriverService.save(this.busDriverModel())
    .subscribe({ 
      next: () => {
        this.isSubmitting.set(false);
        this.errorMessage.set(null);
        this._snackBar.open("Bus driver created successfully", "Close");
      }, 
      error: (err: HttpErrorResponse) => {
        this.isSubmitting.set(false);
        this.errorMessage.set(getErrorMessage(err)); 
      }}); 
    }

}
