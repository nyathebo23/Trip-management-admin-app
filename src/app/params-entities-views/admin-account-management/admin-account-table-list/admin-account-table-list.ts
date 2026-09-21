import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDeleteDialog } from '../../../global/confirm-delete-dialog/confirm-delete-dialog';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { AdminAccountService } from '../../../services/admin-account-service';
import { AsyncPipe } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-admin-account-table-list',
  imports: [MatPaginatorModule, MatTableModule, MatIconModule, 
    MatButtonModule, MatCardModule, AsyncPipe],
  templateUrl: './admin-account-table-list.html',
  styleUrl: './admin-account-table-list.scss',
})
export class AdminAccountTableList {
  displayedColumns: string[] = ['Username', 'Firstname', 'Lastname', 'Role', 'Options'];
  adminAccountsService = inject(AdminAccountService);
  private readonly _snackBar = inject(MatSnackBar);
  readonly deleteDialog = inject(MatDialog);
  readonly editDialog = inject(MatDialog);
  adminAccountsResp$ = this.adminAccountsService.adminAccountsResp$;

  deleteItem(id: string) { 
    this.deleteDialog.open(ConfirmDeleteDialog, { 
      data: { 
        title: 'Delete Admin', 
        entityName: 'Admin Account', 
        deleteFunction: () => this.performDelete(id), 
      }
    }); 
  }

  performDelete(id: string) {
    this.adminAccountsService.delete(id)
    .subscribe({
      next: () => {
        this._snackBar.open("Admin deleted successfully", "Close");
      },
      error: (err) => {
        console.log(err);
        this._snackBar.open("Admin deletion failed", "Close");
      }
    });
  }

}
