import { Component, inject, input, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { form, FormField, required } from '@angular/forms/signals';
import { MatAnchor } from '@angular/material/button';
import { HttpErrorResponse } from '@angular/common/http';
import { passwordsShouldmatch, requireDigit, requireLowercase, requireNonAlphanumeric, 
  requireNoSpaces, requireUppercase,  shouldBeAlphanumeric, shouldStartWithLetter, 
  shouldNotStartWithSpace, minLength} from '../../utils/validation-rules';
import { getErrorMessage } from '../../utils/response';
import { AgencyAgentService } from '../../services/agency-agent-service';
import { ROLE } from '../../utils/roles';
import { MatOption, MatSelect } from "@angular/material/select";
import { Agency } from '../../models/agency';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-agency-agent-form',
  imports: [MatCardModule, MatInputModule, MatFormFieldModule, MatProgressBarModule,
    ReactiveFormsModule, FormField, MatAnchor, MatSelect, MatOption],  
  templateUrl: './agency-agent-form.html',
  styleUrl: './agency-agent-form.scss',
})
export class AgencyAgentForm {
  
  agencyAgentService = inject(AgencyAgentService);
  isSubmitting = signal(false);
  private readonly _snackBar = inject(MatSnackBar);
  agencyAgentModel = signal({ 
    firstname: '', 
    lastname: '', 
    username: '', 
    password: '',
    confirmPassword: '',
    role: ROLE.AGENCYAGENT,
    agencyId: ''
  });
  agencies = input.required<Agency[]>();
  roles = [{
    label: 'Agency Agent',
    value: ROLE.AGENCYAGENT
  }, {
    label: 'Agency Admin',
    value: ROLE.AGENCYADMIN
  }];
  errorMessage = signal<string|null>(null);
  agencyAgentForm = form(this.agencyAgentModel, (schema) => { 
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
    required(schema.agencyId, {message: "Agency is required"});
  });

  submit() { 
    this.isSubmitting.set(true);
    this.agencyAgentService.save(this.agencyAgentModel())
    .subscribe({ 
      next: () => {
        this.errorMessage.set(null);
        this.isSubmitting.set(false);
        this._snackBar.open("Agency agent created successfully", "Close");
      }, 
      error: (err: HttpErrorResponse) => {
        this.errorMessage.set(getErrorMessage(err)); 
        this.isSubmitting.set(false);
      }}); 
    }

}
