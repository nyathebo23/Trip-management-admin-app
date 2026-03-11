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
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatProgressBarModule} from '@angular/material/progress-bar';

@Component({
  selector: 'app-admin-account-edit-dialog',
  imports: [MatInputModule, MatFormFieldModule, ReactiveFormsModule, MatProgressBarModule,
    FormField, MatAnchor, MatDivider, MatDialogActions, MatDialogContent],
  templateUrl: './admin-account-edit-dialog.html',
  styleUrl: './admin-account-edit-dialog.scss',
})
export class AdminAccountEditDialog {
  readonly dialogRef = inject(MatDialogRef<AdminAccountEditDialog>);
  private readonly _snackBar = inject(MatSnackBar);
  isSubmitting = signal(false);
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
    this.isSubmitting.set(true);
    this.adminAccountService.update(this.data.id, this.adminModel())
      .subscribe({ 
        next: () => {
          this.errorMessage.set(null);
          this._snackBar.open("Admin edited sucessfully");
          this.dialogRef.close(true);
        }, 
        error: (err: HttpErrorResponse) => {
          this.isSubmitting.set(false);
          this.errorMessage.set(getErrorMessage(err)); 
        },
        complete: () => {
          this.isSubmitting.set(false);
        }
      }); 
    }

    closeDialog() { this.dialogRef.close(); }

}
