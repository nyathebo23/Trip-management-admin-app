import { Component, inject } from '@angular/core';
import { TravelTicketTableList } from '../travel-ticket-table-list/travel-ticket-table-list';
import { Agency } from '../../../models/agency';
import { toResponseState } from '../../../utils/response';
import { AgencyService } from '../../../services/agency-service';
import { PaymentMethodService } from '../../../services/payment-method-service';
import { combineLatest } from 'rxjs/internal/observable/combineLatest';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-travel-ticket-management',
  imports: [TravelTicketTableList, AsyncPipe],
  templateUrl: './travel-ticket-management.html',
  styleUrl: './travel-ticket-management.scss',
})
export class TravelTicketManagement {
  agencyService = inject(AgencyService);
  paymentMethodService = inject(PaymentMethodService);
  agenciesResp$ = toResponseState<Agency>(this.agencyService.getAll());
  paymentMethodsResp$ = toResponseState(this.paymentMethodService.getAll());
  state$ = combineLatest({
    agencies: this.agenciesResp$, 
    paymentMethods: this.paymentMethodsResp$
  });
}
