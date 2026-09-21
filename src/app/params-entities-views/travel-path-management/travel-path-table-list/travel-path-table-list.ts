import { Component, inject, input } from '@angular/core';
import { TravelPathService } from '../../../services/travel-path-service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDeleteDialog } from '../../../global/confirm-delete-dialog/confirm-delete-dialog';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TravelPathEditDialog } from '../travel-path-edit-dialog/travel-path-edit-dialog';
import { TravelPathDetails } from '../../../models/travel-path-details';

@Component({
  selector: 'app-travel-path-table-list',
  imports: [MatIconModule, MatButtonModule, MatCardModule, MatTableModule, MatPaginatorModule],
  templateUrl: './travel-path-table-list.html',
  styleUrl: './travel-path-table-list.scss',
})
export class TravelPathTableList {
  displayedColumns: string[] = ['Agency 1', 'Agency 2', 'Distance', 'Estimated travel duration', 'Options'];
  travelPathService = inject(TravelPathService);
  private readonly _snackBar = inject(MatSnackBar);
  readonly deleteDialog = inject(MatDialog);
  readonly editDialog = inject(MatDialog);

  travelPaths = input.required<TravelPathDetails[]>();
  
  deleteItem(id: string) { 
    this.deleteDialog.open(ConfirmDeleteDialog, { 
      data: { 
        title: 'Delete Travel Path', 
        entityName: 'Travel Path', 
        deleteFunction: () => this.performDelete(id), 
      }
    }); 
  }

  editItem(item: TravelPathDetails) { 
    this.editDialog.open(TravelPathEditDialog, { data: item }); 
  }

  performDelete(id: string) {
    this.travelPathService.delete(id)
    .subscribe({
      next: () => {
        this._snackBar.open("Travel path deleted successfully", "Close");
      },
      error: () => {
        this._snackBar.open("Travel path deletion failed", "Close");
      }
    });
  }

}
