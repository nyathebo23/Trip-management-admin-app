import { Component, inject, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDeleteDialog } from '../../../global/confirm-delete-dialog/confirm-delete-dialog';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { BusDriverService } from '../../../services/bus-driver-service';
import { BusDriver } from '../../../models/bus-driver';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-bus-driver-table-list',
  imports: [MatIconModule, MatButtonModule, MatCardModule, 
    MatTableModule, MatPaginatorModule],
  templateUrl: './bus-driver-table-list.html',
  styleUrl: './bus-driver-table-list.scss',
})
export class BusDriverTableList {
  displayedColumns: string[] = ['Username', 'Firstname', 'Lastname', 'Role', 'Options'];
  busDriverService = inject(BusDriverService);
  readonly deleteDialog = inject(MatDialog);
  readonly editDialog = inject(MatDialog);
  private readonly _snackBar = inject(MatSnackBar);

  busDrivers = input.required<BusDriver[]>();

  deleteItem(id: string) { 
    this.deleteDialog.open(ConfirmDeleteDialog, { 
      data: { 
        title: 'Delete bus driver', 
        entityName: 'Bus Driver', 
        deleteFunction: () => this.performDelete(id),
      }
    }); 
  }

  performDelete(id: string) {
    this.busDriverService.delete(id)
    .subscribe({
      next: () => {
        this._snackBar.open("Bus driver deleted successfully", "Close");
      },
      error: () => {
        this._snackBar.open("Bus driver deletion failed", "Close");
      }
    });
  }
}
