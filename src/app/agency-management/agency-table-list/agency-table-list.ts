import { Component, inject, input } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { catchError, map, of } from 'rxjs';
import { AgencyService } from '../../services/agency-service';
import { HttpErrorResponse } from '@angular/common/http';
import { getErrorType, ResponseState } from '../../utils/response';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDeleteDialog } from '../../global/confirm-delete-dialog/confirm-delete-dialog';
import { AgencyEditDialog } from '../agency-edit-dialog/agency-edit-dialog';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { Agency } from '../../models/agency';
import { ICity } from '../../city-management/interfaces/icity';

@Component({
  selector: 'app-agency-table-list',
  imports: [AsyncPipe, MatPaginatorModule, MatTableModule, MatIconModule, MatButtonModule, MatCardModule],
  templateUrl: './agency-table-list.html',
  styleUrl: './agency-table-list.scss',
})
export class AgencyTableList {
  displayedColumns: string[] = ['Location description', 'Quarter', 'City', 'Options'];
  agencyService = inject(AgencyService);
  cities = input.required<ICity[]>();
  readonly deleteDialog = inject(MatDialog);
  readonly editDialog = inject(MatDialog);

  agenciesResp$ = this.agencyService.getAll().pipe(
    map(data => ({ data, errorType: null } satisfies ResponseState<Agency[]>)),
    catchError((err: HttpErrorResponse) => of({ data: null, errorType: getErrorType(err) }))
  );

  getCityName(cityId: string): string {
    const city = this.cities().find(c => c.id === cityId);
    return city ? city.name : 'Unknown';
  }

  deleteItem(id: string) {
    this.deleteDialog.open(ConfirmDeleteDialog, { 
      data: { 
        title: 'Delete Agency', 
        entityName: 'Agency', 
        confirmFn: this.performDelete, 
        objectId: id 
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

  performDelete(id: string) {}
}