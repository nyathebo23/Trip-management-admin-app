import { Component, inject } from '@angular/core';
import { TicketRefundTableList } from '../ticket-refund-table-list/ticket-refund-table-list';
import { Agency } from '../../../models/agency';
import { toResponseState } from '../../../utils/response';
import { AgencyService } from '../../../services/agency-service';
import { PaymentMethodService } from '../../../services/payment-method-service';
import { combineLatest } from 'rxjs/internal/observable/combineLatest';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-ticket-refund-management',
  imports: [TicketRefundTableList, AsyncPipe],
  templateUrl: './ticket-refund-management.html',
  styleUrl: './ticket-refund-management.scss',
})
export class TicketRefundManagement {
  agencyService = inject(AgencyService);
  paymentMethodService = inject(PaymentMethodService);
  agenciesResp$ = toResponseState<Agency>(this.agencyService.getAll());
  paymentMethodsResp$ = toResponseState(this.paymentMethodService.getAll());
  state$ = combineLatest({
    agencies: this.agenciesResp$, 
    paymentMethods: this.paymentMethodsResp$
  });
}
