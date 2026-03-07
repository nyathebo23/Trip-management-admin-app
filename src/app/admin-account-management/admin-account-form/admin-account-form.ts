import { Component, inject, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { form, FormField, required } from '@angular/forms/signals';
import { MatAnchor } from '@angular/material/button';
import { AdminAccountService } from '../../services/admin-account-service';
import { HttpErrorResponse } from '@angular/common/http';
import { passwordsShouldmatch, requireDigit, requireLowercase, requireNonAlphanumeric, 
  requireNoSpaces, requireUppercase,  shouldBeAlphanumeric, shouldStartWithLetter, 
  shouldNotStartWithSpace, 
  minLength} from '../../utils/validation-rules';
import { getErrorMessage } from '../../utils/response';

@Component({
  selector: 'app-admin-account-form',
  imports: [MatCardModule, MatInputModule, MatFormFieldModule, 
    ReactiveFormsModule, FormField, MatAnchor],
  templateUrl: './admin-account-form.html',
  styleUrl: './admin-account-form.scss',
})
export class AdminAccountForm {
  adminAccountService = inject(AdminAccountService);
  adminModel = signal({ 
    firstname: '', 
    lastname: '', 
    username: '', 
    password: '',
    confirmPassword: ''
  });
  errorMessage = signal<string|null>(null);

  adminForm = form(this.adminModel, (schema) => { 
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
    this.adminAccountService.save(this.adminModel())
    .subscribe({ 
      next: () => {
        this.errorMessage.set(null);
      }, 
      error: (err: HttpErrorResponse) => {
        this.errorMessage.set(getErrorMessage(err)); 
      }}); 
    }

}
