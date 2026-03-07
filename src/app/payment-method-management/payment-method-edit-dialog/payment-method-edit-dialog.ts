import { Component, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatDivider } from '@angular/material/divider';
import { form, FormField, required } from '@angular/forms/signals';
import { shouldNotStartWithSpace } from '../../utils/validation-rules';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { getErrorMessage } from '../../utils/response';
import { PaymentMethodService } from '../../services/payment-method-service';
import { PaymentMethod } from '../interfaces/payment-method';
import { PaymentMethodData } from '../interfaces/payment-method-data';

@Component({
  selector: 'app-payment-method-edit-dialog',
  imports: [MatDialogTitle, MatDialogContent, MatDialogActions, MatButtonModule, MatDivider,
    FormField, MatInputModule, MatFormFieldModule, ReactiveFormsModule
  ],  
  templateUrl: './payment-method-edit-dialog.html',
  styleUrl: './payment-method-edit-dialog.scss',
})
export class PaymentMethodEditDialog {
  readonly dialogRef = inject(MatDialogRef<PaymentMethodEditDialog>);
  data = inject<PaymentMethod>(MAT_DIALOG_DATA);
  errorMessage = signal<string | null>(null);
  paymentMethodService  = inject(PaymentMethodService)
  
  paymentMethodModel = signal<PaymentMethodData>({
    name: this.data.name,
  });

  paymentMethodForm = form(this.paymentMethodModel, (schemaPath) => {
    required(schemaPath.name, {message: "Payment method name is required"}),
    shouldNotStartWithSpace(schemaPath.name, {message: "Payment method name shouldn't start with space"});
  });
  
  closeDialog() {
    this.dialogRef.close();
  }

  submit() {
    this.paymentMethodService.update(this.data.id, this.paymentMethodModel()).subscribe({
      next: (res) => {
        this.errorMessage.set(null);
        this.dialogRef.close(true);
      },
      error: (err: HttpErrorResponse) => {
        this.errorMessage.set(getErrorMessage(err));
      }
    });
  }
}
