import { Component, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogTitle, MatDialogContent, MatDialogActions } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { AgencyService } from '../../services/agency-service';
import { form, FormField, required } from '@angular/forms/signals';
import { HttpErrorResponse } from '@angular/common/http';
import { MatOption, MatSelect } from "@angular/material/select";
import { getErrorMessage } from '../../utils/response';
import { AgencyDialogData } from '../interfaces/agency-dialog-data';
import { MatDivider } from '@angular/material/divider';

@Component({
  selector: 'app-agency-edit-dialog',
  imports: [MatDialogTitle, MatDialogContent, MatDialogActions, MatButtonModule, MatDivider,
    FormField, MatInputModule, MatFormFieldModule, ReactiveFormsModule, MatSelect, MatOption],
  templateUrl: './agency-edit-dialog.html',
  styleUrl: './agency-edit-dialog.scss',
})
export class AgencyEditDialog {
  readonly dialogRef = inject(MatDialogRef<AgencyEditDialog>);
  data = inject<AgencyDialogData>(MAT_DIALOG_DATA);
  errorMessage = signal<string|null>(null);
  agencyService = inject(AgencyService);
  agencyModel = signal({ 
    locationDesc: this.data.agency.locationDesc || '', 
    quarter: this.data.agency.quarter || '', 
    city: this.data.agency.city.id || '' 
  });

  agencyForm = form(this.agencyModel, (schema) => { 
    required(schema.locationDesc, {message: 'Location required'}); 
    required(schema.city, {message: 'City required'}); 
    required(schema.quarter, {message: 'Quarter required'});
  });

  closeDialog() { this.dialogRef.close(); }

  submit() {
    this.agencyService.update(this.data.agency.id, this.agencyModel())
    .subscribe({ 
      next: () => {
        this.errorMessage.set(null);
        this.dialogRef.close(true)
      }, 
      error: (err: HttpErrorResponse) => this.errorMessage.set(getErrorMessage(err))
    });
  }
}
