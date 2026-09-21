import { Component, inject, signal } from '@angular/core';
import { PaymentMethodTableList } from '../payment-method-table-list/payment-method-table-list';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatGridListModule } from '@angular/material/grid-list';
import { PaymentMethodForm } from '../payment-method-form/payment-method-form';
import { PaymentMethodService } from '../../../services/payment-method-service';
import { combineLatest } from 'rxjs/internal/observable/combineLatest';
import { AuditHistory } from '../../../global/audit-history/audit-history';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-payment-method-management',
  imports: [AsyncPipe, PaymentMethodTableList, MatExpansionModule, PaymentMethodForm, MatGridListModule, AuditHistory],
  templateUrl: './payment-method-management.html',
  styleUrl: './payment-method-management.scss',
})
export class PaymentMethodManagement {
  readonly formOpenState = signal(false);
  paymentMethodService = inject(PaymentMethodService);

  paymentMethodsDatas$ = combineLatest({
    paymentMethods: this.paymentMethodService.paymentMethodsResp$,
    paymentMethodAudits: this.paymentMethodService.paymentMethodAuditsResp$
  });
}
