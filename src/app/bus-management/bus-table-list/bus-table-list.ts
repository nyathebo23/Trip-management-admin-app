import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { catchError, map, of } from 'rxjs';
import { BusService } from '../../services/bus-service';
import { HttpErrorResponse } from '@angular/common/http';
import { getErrorType, ResponseState } from '../../utils/response';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDeleteDialog } from '../../global/confirm-delete-dialog/confirm-delete-dialog';
import { BusEditDialog } from '../bus-edit-dialog/bus-edit-dialog';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { IBus } from '../interfaces/ibus';

@Component({
  selector: 'app-bus-table-list',
  imports: [AsyncPipe, MatPaginatorModule, MatTableModule, MatIconModule, 
    MatButtonModule, MatCardModule, MatCheckboxModule],
  templateUrl: './bus-table-list.html',
  styleUrl: './bus-table-list.scss',
})
export class BusTableList {
  displayedColumns: string[] = ['Serial Number', 'Brand', 'Capacity', 'Usable', 'Options'];
  busService = inject(BusService);
  readonly deleteDialog = inject(MatDialog);
  readonly editDialog = inject(MatDialog);

  busesResp$ = this.busService.getAll().pipe(
    map(data => ({ data, errorType: null } satisfies ResponseState<IBus[]>)),
    catchError((err: HttpErrorResponse) => of({ data: null, errorType: getErrorType(err) }))
  );

  deleteItem(id: string) { 
    this.deleteDialog.open(ConfirmDeleteDialog, { 
      data: { 
        title: 'Delete Bus', 
        entityName: 'Bus', 
        confirmFn: this.performDelete, 
        objectId: id 
      }
    }); 
  }
  editItem(item: IBus) { 
    this.editDialog.open(BusEditDialog, { data: item }); 
  }

  performDelete(id: string) {}
}
