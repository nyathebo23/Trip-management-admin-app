import { Component, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { form, FormField, required } from '@angular/forms/signals';
import { shouldNotStartWithSpace } from '../../../utils/validation-rules';
import {MatCardModule} from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { getErrorMessage } from '../../../utils/response';
import { PaymentMethodService } from '../../../services/payment-method-service';
import { PaymentMethodData } from '../interfaces/payment-method-data';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-payment-method-form',
  imports: [MatButtonModule, MatCardModule, MatProgressBarModule,
    FormField, MatInputModule, MatFormFieldModule, ReactiveFormsModule],
  templateUrl: './payment-method-form.html',
  styleUrl: './payment-method-form.scss',
})
export class PaymentMethodForm {
  isSubmitting = signal(false);
  private readonly _snackBar = inject(MatSnackBar);
  errorMessage = signal<string | null>(null);
  paymentMethodService  = inject(PaymentMethodService)
  
  paymentMethodModel = signal<PaymentMethodData>({
    name: '',
  });

  paymentMethodForm = form(this.paymentMethodModel, (schemaPath) => {
    required(schemaPath.name, {message: "Payment method name is required"}),
    shouldNotStartWithSpace(schemaPath.name, {message: "Payment method name shouldn't start with space"});
  });


  submit() {
    this.isSubmitting.set(true);
    this.paymentMethodService.save(this.paymentMethodModel()).subscribe({
      next: () => {
        this.errorMessage.set(null);
        this.isSubmitting.set(false);
        this._snackBar.open("Payment method created successfully", "Close");
      },
      error: (err: HttpErrorResponse) => {
        this.errorMessage.set(getErrorMessage(err));
        this.isSubmitting.set(false);
      }
    });
  }
}
