import { Component, inject, input } from '@angular/core';
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
import { AgencyAgentService } from '../../services/agency-agent-service';
import { IAgencyAgent } from '../interfaces/iagency-agent';
import { IAgency } from '../../agency-management/interfaces/iagency';
import { Agency } from '../../models/agency';

@Component({
  selector: 'app-agency-agent-table-list',
  imports: [AsyncPipe, MatIconModule, MatButtonModule, MatCardModule, MatTableModule, MatPaginatorModule],
  templateUrl: './agency-agent-table-list.html',
  styleUrl: './agency-agent-table-list.scss',
})
export class AgencyAgentTableList {

  displayedColumns: string[] = ['Username', 'Firstname', 'Lastname', 'Role', 'Agency', 'Options'];
  agencyAgentService = inject(AgencyAgentService);
  readonly deleteDialog = inject(MatDialog);
  agencies = input.required<Agency[]>();
  agencyAgentsResp$ = this.agencyAgentService.getAll().pipe(
    map(data => ({ data, errorType: null } satisfies ResponseState<IAgencyAgent[]>)),
    catchError((err: HttpErrorResponse) => of({ data: null, errorType: getErrorType(err) }))
  );

  getAgency(id: string): string {
    const agency = this.agencies().find(a => a.id === id);
    return agency ? agency.toString() : 'Unknown';
  }

  deleteItem(id: string) { 
    this.deleteDialog.open(ConfirmDeleteDialog, { 
      data: { 
        title: 'Delete agency agent', 
        entityName: 'Agency agent', 
        confirmFn: this.performDelete, 
        objectId: id 
      }
    }); 
  }

  performDelete(id: string) {

  }
}
