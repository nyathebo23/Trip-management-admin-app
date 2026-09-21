import { Component, inject, input, signal, ViewChild } from '@angular/core';
import { TravelType } from '../../travel-management/enums/travel-type';
import { TicketType } from '../interfaces/ticket-type';
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

import { TravelTicketService } from '../../../services/travel-ticket-service';
import { Agency } from '../../../models/agency';
import { MatOption, MatSelect } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatTimepickerModule } from '@angular/material/timepicker';
import { rangeDateValidity, validateDatetime } from '../../../utils/validation-rules';
import { HttpErrorResponse, HttpParams } from '@angular/common/http';
import { getErrorMessage } from '../../../utils/response';
import { TicketDetails } from '../interfaces/ticket-details';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { PaymentMethod } from '../../../models/payment-method';

@Component({
  selector: 'app-travel-ticket-table-list',
  imports: [MatPaginatorModule, MatTableModule, MatFormFieldModule, MatDatepickerModule, MatFormFieldModule, 
    FormsModule, ReactiveFormsModule, MatIconModule, MatButtonModule, MatCardModule, MatCheckbox,
  MatSelect, MatOption, MatButtonToggleModule, FormField, MatTimepickerModule, MatInputModule, DatePipe],
  templateUrl: './travel-ticket-table-list.html', 
  styleUrl: './travel-ticket-table-list.scss',
  providers: [DatePipe],

})
export class TravelTicketTableList {

  displayedColumns: string[] = ['Agency', 'Ref number', 'Customer', 'Ticket type', 'Paid',
    'Payment method', 'Issuance datetime', 'Used', 'Refunded'];
  ticketService = inject(TravelTicketService);
  pageIndex = 0;         
  pageSize = 10;          
  totalTickets = 0;
  isLoading = signal(true);
  errorMessage = signal<string>('');
  agencies = input.required<Agency[]>();
  paymentMethods = input.required<PaymentMethod[]>();    
  datePipe = inject(DatePipe);
  dataSource = signal<TicketDetails[]>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  travelTypes = [
    {label: 'CLASSIC', value: TravelType.CLASSIC}, 
    {label: 'VIP', value: TravelType.VIP}
  ]; 
  ticketTypes = [
    {label: 'RESERVATION', value: TicketType.RESERVATION},
    {label: 'DIRECT', value: TicketType.DIRECT}
  ];
  reqParamsModel = signal({
    startDatetime: null as Date | null,
    endDatetime: null as Date | null,
    travelType: null as TravelType | null,
    ticketType: null as TicketType | null,
    paymentMethod: null as string | null,
    agency: null as string | null,
    used: null as boolean | null,
    refunded: null as boolean | null
  });

  reqParamsForm = form(this.reqParamsModel, (schema) => {
    rangeDateValidity(schema.startDatetime, schema.endDatetime);
    validateDatetime(schema.startDatetime, {message: 'Start time has invalid format'});
    validateDatetime(schema.endDatetime, {message: 'End time has invalid format'});
    required(schema.agency, {message: 'Agency is required'});
  });

  onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getDatasTravelTickets();
  }

  getDatasTravelTickets() {
    const params = this.reqParamsModel();

    let reqParams = new HttpParams()
    .set("pageNumber", this.pageIndex)
    .set("pageSize", this.pageSize)
    
    if (params.startDatetime)
      reqParams = reqParams.append("startDateTime", this.datePipe.transform(params.startDatetime, 'yyyy-MM-ddTHH:mm:ss')!);
    if (params.endDatetime)
      reqParams = reqParams.append("endDateTime", this.datePipe.transform(params.endDatetime, 'yyyy-MM-ddTHH:mm:ss')!);
    if (params.travelType)
      reqParams = reqParams.append("travelType", params.travelType);
    if (params.ticketType)
      reqParams = reqParams.append("ticketType", params.ticketType);
    if (params.paymentMethod)
      reqParams = reqParams.append("paymentMethodId", params.paymentMethod);
    // if (params.agency)
    //   reqParams = reqParams.append("agencyId", params.agency);
    if (params.used)
      reqParams = reqParams.append("used", params.used);
    if (params.refunded)
      reqParams = reqParams.append("refunded", params.refunded);

    this.isLoading.set(true);

    this.ticketService.getAllByAgency(params.agency!, reqParams)
    .subscribe({
      next: (resp) => {
        this.dataSource.set(resp.items.map((ticket) => {
          return {
            id: ticket.id,
            refNumber: ticket.refNumber,
            ticketType: this.ticketTypes.find(tt => tt.value === ticket.ticketType)?.label || 'unknown',
            issuanceDatetime: ticket.issuanceDatetime,
            paid: ticket.paid,
            paymentMethod: this.getPaymentMethodName(ticket.paymentMethodId),
            customerFullname: ticket.customerFullname,
            agency: this.getAgencyString(ticket.agencyId),
            used: ticket.used,
            refund: ticket.refund
          }
        }));
        this.totalTickets = resp.totalCount;
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
