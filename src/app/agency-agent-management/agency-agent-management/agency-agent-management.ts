import { Component, inject, signal } from '@angular/core';
import { getErrorType, ResponseState, toResponseState } from '../../utils/response';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/internal/operators/catchError';
import { map } from 'rxjs/internal/operators/map';
import { of } from 'rxjs';
import { MatExpansionPanel, MatAccordion, MatExpansionPanelHeader, 
  MatExpansionPanelTitle, MatExpansionPanelDescription } from "@angular/material/expansion";
import { AsyncPipe } from '@angular/common';
import { AgencyService } from '../../services/agency-service';
import { AgencyAgentTableList } from '../agency-agent-table-list/agency-agent-table-list';
import { AgencyAgentForm } from '../agency-agent-form/agency-agent-form';
import { IAgency } from '../../agency-management/interfaces/iagency';
import { Agency } from '../../models/agency';

@Component({
  selector: 'app-agency-agent-management',
  imports: [AsyncPipe, MatExpansionPanel, MatAccordion, MatExpansionPanelHeader, 
    MatExpansionPanelTitle, AgencyAgentForm, AgencyAgentTableList],  
    templateUrl: './agency-agent-management.html',
  styleUrl: './agency-agent-management.scss',
})
export class AgencyAgentManagement {
  readonly formOpenState = signal(false);
  agencyService = inject(AgencyService);
  agenciesResp$ = toResponseState<Agency>(this.agencyService.getAll());
}
