import { Component, inject, ViewChild } from '@angular/core';
import { CustomerService } from '../../../services/customer-service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDeleteDialog } from '../../../global/confirm-delete-dialog/confirm-delete-dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { AsyncPipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { CustomerReqQuery } from '../interfaces/customer-req-query';
import { MatInputModule } from '@angular/material/input';
import { MatOption, MatSelect } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-customer-table-list',
  imports: [MatPaginatorModule, MatTableModule, MatIconModule, MatButtonModule, MatCardModule, 
   MatFormFieldModule, FormsModule, ReactiveFormsModule, MatIconModule, MatSelect, MatOption, 
   MatInputModule ,AsyncPipe],
  templateUrl: './customer-table-list.html',
  styleUrl: './customer-table-list.scss',
})
export class CustomerTableList {
  displayedColumns: string[] = ['Username', 'Firstname', 'Lastname', 'Phone number', 'Birth date', 'Options'];
  customersService = inject(CustomerService);
  private readonly _snackBar = inject(MatSnackBar);
  readonly deleteDialog = inject(MatDialog);
  readonly editDialog = inject(MatDialog);
  sortableFields = [
    { value: 'lastname', label: 'Lastname' },
    { value: 'firstname', label: 'Firstname' },
    { value: 'username', label: 'Username' },
    { value: 'birthDate', label: 'Birth date' },
  ];
  customersResp$ = this.customersService.customersResp$;
  queryParams: CustomerReqQuery = {
    pageSize: 10,
    pageNumber: 0,
  };

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  
  onPageChange(event: PageEvent) {
    this.queryParams.pageNumber = event.pageIndex;
    this.queryParams.pageSize = event.pageSize;
    this.customersService.queryCustomers(this.queryParams);
  }

  queryCustomers() {
    this.queryParams.pageNumber = 0;
    this.customersService.queryCustomers(this.queryParams);
  }

  deleteItem(id: string) { 
    this.deleteDialog.open(ConfirmDeleteDialog, { 
      data: { 
        title: 'Delete customer', 
        entityName: 'Customer', 
        deleteFunction: () => this.performDelete(id), 
      }
    }); 
  }

  performDelete(id: string) {
    this.customersService.delete(id)
    .subscribe({
      next: () => {
        this._snackBar.open("Customer deleted successfully", "Close");
      },
      error: (err) => {
        console.log(err);
        this._snackBar.open("Customer deletion failed", "Close");
      }
    });
  }

}
