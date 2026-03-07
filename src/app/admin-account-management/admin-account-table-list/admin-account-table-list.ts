import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { catchError, map, of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { getErrorType, ResponseState } from '../../utils/response';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDeleteDialog } from '../../global/confirm-delete-dialog/confirm-delete-dialog';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { AdminAccountService } from '../../services/admin-account-service';
import { IUser } from '../../authentication/interfaces/iuser';

@Component({
  selector: 'app-admin-account-table-list',
  imports: [AsyncPipe, MatPaginatorModule, MatTableModule, MatIconModule, MatButtonModule, MatCardModule],
  templateUrl: './admin-account-table-list.html',
  styleUrl: './admin-account-table-list.scss',
})
export class AdminAccountTableList {
  displayedColumns: string[] = ['Username', 'Firstname', 'Lastname', 'Role', 'Options'];
  adminAccountService = inject(AdminAccountService);
  readonly deleteDialog = inject(MatDialog);
  readonly editDialog = inject(MatDialog);

  adminAccountsResp$ = this.adminAccountService.getAll().pipe(
    map(data => ({ data, errorType: null } satisfies ResponseState<IUser[]>)),
    catchError((err: HttpErrorResponse) => of({ data: null, errorType: getErrorType(err) }))
  );

  deleteItem(id: string) { 
    this.deleteDialog.open(ConfirmDeleteDialog, { 
      data: { 
        title: 'Delete Admin', 
        entityName: 'Admin Account', 
        confirmFn: this.performDelete, 
        objectId: id 
      }
    }); 
  }

  performDelete(id: string) {

  }

}
