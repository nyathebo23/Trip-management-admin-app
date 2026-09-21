import { Component, inject, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { AgencyService } from '../../../services/agency-service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDeleteDialog } from '../../../global/confirm-delete-dialog/confirm-delete-dialog';
import { AgencyEditDialog } from '../agency-edit-dialog/agency-edit-dialog';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { Agency } from '../../../models/agency';
import { MatSnackBar } from '@angular/material/snack-bar';
import { City } from '../../../models/city';

@Component({
  selector: 'app-agency-table-list',
  imports: [MatPaginatorModule, MatTableModule, MatIconModule, MatButtonModule, MatCardModule],
  templateUrl: './agency-table-list.html',
  styleUrl: './agency-table-list.scss',
})
export class AgencyTableList {
  displayedColumns: string[] = ['Location description', 'Quarter', 'City', 'Options'];
  agencyService = inject(AgencyService);
  cities = input.required<City[]>();
  readonly deleteDialog = inject(MatDialog);
  readonly editDialog = inject(MatDialog);
  private readonly _snackBar = inject(MatSnackBar);
  agencies = input.required<Agency[]>();

  deleteItem(id: string) {
    this.deleteDialog.open(ConfirmDeleteDialog, { 
      data: { 
        title: 'Delete Agency', 
        entityName: 'Agency', 
        deleteFunction: () => this.performDelete(id), 
      } 
    });
  }

  editItem(item: Agency) { this.editDialog.open(AgencyEditDialog, { 
    data: {
        agency: item,
        cities: this.cities()
      } 
    }); 
  }

  performDelete(id: string) {
    this.agencyService.delete(id)
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