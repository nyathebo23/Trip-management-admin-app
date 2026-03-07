import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { catchError, map, of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { PaymentMethodService } from '../../services/payment-method-service';
import { getErrorType, ResponseState } from '../../utils/response';
import { ConfirmDeleteDialog } from '../../global/confirm-delete-dialog/confirm-delete-dialog';
import { PaymentMethodEditDialog } from '../payment-method-edit-dialog/payment-method-edit-dialog';
import { PaymentMethod } from '../interfaces/payment-method';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-payment-method-table-list',
  imports: [AsyncPipe, MatIconModule, MatButtonModule, MatCardModule, MatTableModule],
  templateUrl: './payment-method-table-list.html',
  styleUrl: './payment-method-table-list.scss',
})
export class PaymentMethodTableList {
  displayedColumns: string[] = ['Name', 'Options'];
  paymentMethodService = inject(PaymentMethodService);
  readonly deleteDialog = inject(MatDialog);
  readonly editDialog = inject(MatDialog);

  paymentMethodsResp$ = this.paymentMethodService.getAll().pipe(
    map(data => ({ data, errorType: null } satisfies ResponseState<PaymentMethod[]>)),
    catchError((err: HttpErrorResponse) => of({ data: null, errorType: getErrorType(err) }))
  );

  deleteItem(id: string) {
    this.deleteDialog.open(ConfirmDeleteDialog, {
      data: { title: 'Delete Payment Method', entityName: 'Payment method', confirmFn: this.performDelete, objectId: id }
    });
  }

  editItem(pm: PaymentMethod) {
    this.editDialog.open(PaymentMethodEditDialog, { data: pm });
  }

  performDelete(id: string) {}
}