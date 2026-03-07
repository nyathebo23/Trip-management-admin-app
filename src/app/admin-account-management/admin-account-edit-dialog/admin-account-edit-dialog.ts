import { Component, inject, signal } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { form, FormField, required } from '@angular/forms/signals';
import { MatAnchor } from '@angular/material/button';
import { AdminAccountService } from '../../services/admin-account-service';
import { HttpErrorResponse } from '@angular/common/http';
import { shouldBeAlphanumeric, shouldStartWithLetter, 
  shouldNotStartWithSpace, minLength} from '../../utils/validation-rules';
import { getErrorMessage } from '../../utils/response';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { IUser } from '../../authentication/interfaces/iuser';
import { MatDivider } from '@angular/material/divider';

@Component({
  selector: 'app-admin-account-edit-dialog',
  imports: [MatInputModule, MatFormFieldModule, ReactiveFormsModule, 
    FormField, MatAnchor, MatDivider, MatDialogActions, MatDialogContent],
  templateUrl: './admin-account-edit-dialog.html',
  styleUrl: './admin-account-edit-dialog.scss',
})
export class AdminAccountEditDialog {
  readonly dialogRef = inject(MatDialogRef<AdminAccountEditDialog>);
  data = inject<IUser>(MAT_DIALOG_DATA);
  adminAccountService = inject(AdminAccountService);
  adminModel = signal({ 
    firstname: this.data.firstname || '', 
    lastname: this.data.lastname || '', 
    username: this.data.username || '', 
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
  });

  submit() { 
    this.adminAccountService.update(this.data.id, this.adminModel())
    .subscribe({ 
      next: () => {
        this.errorMessage.set(null);
        this.dialogRef.close(true);
      }, 
      error: (err: HttpErrorResponse) => {
        this.errorMessage.set(getErrorMessage(err)); 
      }}); 
    }

    closeDialog() { this.dialogRef.close(); }

}
