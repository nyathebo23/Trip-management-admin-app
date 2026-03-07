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
import { BusDriverService } from '../../services/bus-driver-service';
import { BusDriver } from '../../models/bus-driver';

@Component({
  selector: 'app-bus-driver-table-list',
  imports: [AsyncPipe, MatIconModule, MatButtonModule, MatCardModule, 
    MatTableModule, MatPaginatorModule],
  templateUrl: './bus-driver-table-list.html',
  styleUrl: './bus-driver-table-list.scss',
})
export class BusDriverTableList {
  displayedColumns: string[] = ['Username', 'Firstname', 'Lastname', 'Role', 'Options'];
  busDriverService = inject(BusDriverService);
  readonly deleteDialog = inject(MatDialog);

  busDriversResp$ = this.busDriverService.getAll().pipe(
    map(data => ({ data, errorType: null } satisfies ResponseState<BusDriver[]>)),
    catchError((err: HttpErrorResponse) => of({ data: null, errorType: getErrorType(err) }))
  );

  deleteItem(id: string) { 
    this.deleteDialog.open(ConfirmDeleteDialog, { 
      data: { 
        title: 'Delete bus driver', 
        entityName: 'Bus Driver', 
        confirmFn: this.performDelete, 
        objectId: id 
      }
    }); 
  }

  performDelete(id: string) {

  }
}
