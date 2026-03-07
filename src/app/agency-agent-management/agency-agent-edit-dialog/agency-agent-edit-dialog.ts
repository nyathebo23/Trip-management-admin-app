import { Component, inject, input, signal } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { form, FormField, required } from '@angular/forms/signals';
import { MatAnchor } from '@angular/material/button';
import { HttpErrorResponse } from '@angular/common/http';
import { getErrorMessage } from '../../utils/response';
import { AgencyAgentService } from '../../services/agency-agent-service';
import { ROLE } from '../../utils/roles';
import { MatOption, MatSelect } from "@angular/material/select";
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { AgencyAgentUpdateData } from '../interfaces/agency-agent-update-data';
import { AgencyAgentDialogData } from '../interfaces/agency-agent-dialog-data';
import { MatDivider } from '@angular/material/divider';


@Component({
  selector: 'app-agency-agent-edit-dialog',
  imports: [MatDialogContent, MatDialogActions, MatInputModule, MatFormFieldModule, ReactiveFormsModule, 
    FormField, MatAnchor, MatSelect, MatOption, MatDivider, MatDialogTitle],
  templateUrl: './agency-agent-edit-dialog.html',
  styleUrl: './agency-agent-edit-dialog.scss',
})
export class AgencyAgentEditDialog {
  readonly dialogRef = inject(MatDialogRef<AgencyAgentEditDialog>);
  data = inject<AgencyAgentDialogData>(MAT_DIALOG_DATA);
  agencyAgentService = inject(AgencyAgentService);
  agencyAgentModel = signal<AgencyAgentUpdateData>({ 
    role: ROLE.AGENCYAGENT,
    agencyId: ''
  });
  roles = [{
    label: 'Agency Agent',
    value: ROLE.AGENCYAGENT
  }, {
    label: 'Agency Admin',
    value: ROLE.AGENCYADMIN
  }];
  errorMessage = signal<string|null>(null);
  agencyAgentForm = form(this.agencyAgentModel, (schema) => { 
    required(schema.agencyId, {message: "Agency is required"});
  });

  submit() { 
    this.agencyAgentService.update(this.data.agencyAgent.id, this.agencyAgentModel())
    .subscribe({ 
      next: () => {
        this.errorMessage.set(null);
        this.dialogRef.close();
      }, 
      error: (err: HttpErrorResponse) => {
        this.errorMessage.set(getErrorMessage(err)); 
      }}); 
    }
    closeDialog() { this.dialogRef.close(); }

}
