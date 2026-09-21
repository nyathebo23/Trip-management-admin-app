import { Component, inject, input, signal, ViewChild } from '@angular/core';
import { DatePipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { form, FormField, required } from '@angular/forms/signals';

import { Agency } from '../../../models/agency';
import { MatOption, MatSelect } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatTimepickerModule } from '@angular/material/timepicker';
import { rangeDateValidity, validateDatetime } from '../../../utils/validation-rules';
import { HttpErrorResponse, HttpParams } from '@angular/common/http';
import { getErrorMessage } from '../../../utils/response';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { TicketRefundService } from '../../../services/ticket-refund-service';
import { TicketRefundDetails } from '../interfaces/ticket-refund-details';
import { TicketType } from '../../travel-ticket-management/interfaces/ticket-type';
import { PaymentMethod } from '../../../models/payment-method';

@Component({
  selector: 'app-ticket-refund-table-list',
  imports: [MatPaginatorModule, MatTableModule, MatFormFieldModule, MatDatepickerModule, MatFormFieldModule, 
    FormsModule, ReactiveFormsModule, MatIconModule, MatButtonModule, MatCardModule,
  MatSelect, MatOption, MatButtonToggleModule, FormField, MatTimepickerModule, MatInputModule, DatePipe],
  templateUrl: './ticket-refund-table-list.html',
  styleUrl: './ticket-refund-table-list.scss',
  providers: [DatePipe],

})
export class TicketRefundTableList {
 displayedColumns: string[] = ['Agency', 'Ticket ref number', 'Customer', 'Ticket price',
  'Ticket issuance datetime', 'Refund payment method', 'Refund datetime', 'Amount refunded', 'Refund reason'];
  ticketRefundsService = inject(TicketRefundService);
  pageIndex = 0;         
  pageSize = 10;          
  totalRefunds = 0;
  isLoading = signal(true);
  errorMessage = signal<string>('');
  agencies = input.required<Agency[]>();
  paymentMethods = input.required<PaymentMethod[]>();    
  datePipe = inject(DatePipe);
  dataSource = signal<TicketRefundDetails[]>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ticketTypes = [
    {label: 'RESERVATION', value: TicketType.RESERVATION},
    {label: 'DIRECT', value: TicketType.DIRECT}
  ];

  reqParamsModel = signal({
    startDatetime: null as Date | null,
    endDatetime: null as Date | null,
    paymentMethod: null as string | null,
    agency: null as string | null,
  });

  reqParamsForm = form(this.reqParamsModel, (schema) => {
    rangeDateValidity(schema.startDatetime, schema.endDatetime);
    validateDatetime(schema.startDatetime, {message: 'Start time has invalid format'});
    validateDatetime(schema.endDatetime, {message: 'End time has invalid format'});
  });

  onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getDatasTicketRefunds();
  }

  getDatasTicketRefunds() {
    const params = this.reqParamsModel();

    let reqParams = new HttpParams()
    .set("pageNumber", this.pageIndex)
    .set("pageSize", this.pageSize)
    
    if (params.startDatetime)
      reqParams = reqParams.append("startDateTime", this.datePipe.transform(params.startDatetime, 'yyyy-MM-ddTHH:mm:ss')!);
    if (params.endDatetime)
      reqParams = reqParams.append("endDateTime", this.datePipe.transform(params.endDatetime, 'yyyy-MM-ddTHH:mm:ss')!);
    if (params.paymentMethod)
      reqParams = reqParams.append("paymentMethodId", params.paymentMethod);

    this.isLoading.set(true);

    const refundsGetObservable = params.agency ? this.ticketRefundsService.getAllByAgency(params.agency) 
    : this.ticketRefundsService.getAll();
    refundsGetObservable
    .subscribe({
      next: (resp) => {
        this.dataSource.set(resp.items.map((refund) => {
          return {
            id: refund.id,
            refNumber: refund.ticket.refNumber,
            ticketType: this.ticketTypes.find(tt => tt.value === refund.ticket.ticketType)?.label || 'unknown',
            issuanceDatetime: refund.datetime,
            ticketPrice: refund.paid,
            ticketPaymentMethod: this.getPaymentMethodName(refund.paymentMethodId),
            refundPaymentMethod: this.getPaymentMethodName(refund.paymentMethodId),
            refundReason: refund.reason,
            amountRefunded: refund.paid,
            customerFullname: refund.ticket.customerFullname,
            agency: this.getAgencyString(refund.ticket.agencyId),
          }
        }));
        this.totalRefunds = resp.totalCount;
      },

      error: (err: HttpErrorResponse) => {
        this.errorMessage.set(getErrorMessage(err));
      }, 
      complete: () => {
        this.isLoading.set(false);
      }
    });
  }

  getAgencyString(id: string): string {
    const agency = this.agencies().find(val => val.id == id);
    return agency ? agency.toString() : 'unknown';
  }

  getPaymentMethodName(id: string) {
    const paymentMethod = this.paymentMethods().find(val => val.id == id);
    return paymentMethod ? paymentMethod.name : 'unknown';
  }
}
