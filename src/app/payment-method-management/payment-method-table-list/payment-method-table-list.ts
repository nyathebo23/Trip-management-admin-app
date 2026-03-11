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
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-payment-method-table-list',
  imports: [AsyncPipe, MatIconModule, MatButtonModule, MatCardModule, MatTableModule],
  templateUrl: './payment-method-table-list.html',
  styleUrl: './payment-method-table-list.scss',
})
export class PaymentMethodTableList {

  displayedColumns: string[] = ['Name', 'Options'];
  private readonly _snackBar = inject(MatSnackBar);
  paymentMethodService = inject(PaymentMethodService);
  readonly deleteDialog = inject(MatDialog);
  readonly editDialog = inject(MatDialog);

  paymentMethodsResp$ = this.paymentMethodService.paymentMethodsResp$;

  deleteItem(id: string) {
    this.deleteDialog.open(ConfirmDeleteDialog, {
      data: { 
        title: 'Delete Payment Method', 
        entityName: 'Payment method', 
        deleteFunction: () => this.performDelete(id), 
      }
    });
  }

  editItem(pm: PaymentMethod) {
    this.editDialog.open(PaymentMethodEditDialog, { data: pm });
  }

  performDelete(id: string) {
    this.paymentMethodService.delete(id)
    .subscribe({
      next: () => {
        this._snackBar.open("Agency deleted successfully", "Close");
      },
      error: () => {
        this._snackBar.open("Agency deletion failed", "Close");
      }
    });
  }
}