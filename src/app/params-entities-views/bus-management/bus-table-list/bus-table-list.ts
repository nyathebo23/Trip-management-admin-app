import { Component, inject, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { BusService } from '../../../services/bus-service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDeleteDialog } from '../../../global/confirm-delete-dialog/confirm-delete-dialog';
import { BusEditDialog } from '../bus-edit-dialog/bus-edit-dialog';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Bus } from '../../../models/bus';

@Component({
  selector: 'app-bus-table-list',
  imports: [MatPaginatorModule, MatTableModule, MatIconModule, 
    MatButtonModule, MatCardModule, MatCheckboxModule],
  templateUrl: './bus-table-list.html',
  styleUrl: './bus-table-list.scss',
})
export class BusTableList {

  displayedColumns: string[] = ['Serial Number', 'Brand', 'Capacity', 'Usable', 'Options'];
  busService = inject(BusService);
  private readonly _snackBar = inject(MatSnackBar);
  readonly deleteDialog = inject(MatDialog);
  readonly editDialog = inject(MatDialog);
  buses = input.required<Bus[]>();

  deleteItem(id: string) { 
    this.deleteDialog.open(ConfirmDeleteDialog, { 
      data: { 
        title: 'Delete Bus', 
        entityName: 'Bus', 
        deleteFunction: () => this.performDelete(id), 
      }
    }); 
  }

  editItem(item: Bus) { 
    this.editDialog.open(BusEditDialog, { data: item }); 
  }

  performDelete(id: string) {
    this.busService.delete(id)
    .subscribe({
      next: () => {
        this._snackBar.open("Bus deleted successfully", "Close");
      },
      error: () => {
        this._snackBar.open("Bus deletion failed", "Close");
      }
    });
  }
}
