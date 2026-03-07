
import { Component, signal } from '@angular/core';
import { PaymentMethodTableList } from '../payment-method-table-list/payment-method-table-list';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatGridListModule } from '@angular/material/grid-list';
import { PaymentMethodForm } from '../payment-method-form/payment-method-form';
import { A11yModule } from '@angular/cdk/a11y';

@Component({
  selector: 'app-payment-method-management',
  imports: [PaymentMethodTableList, MatExpansionModule, PaymentMethodForm, MatGridListModule, A11yModule],
  templateUrl: './payment-method-management.html',
  styleUrl: './payment-method-management.scss',
})
export class PaymentMethodManagement {
  readonly formOpenState = signal(false);
}
