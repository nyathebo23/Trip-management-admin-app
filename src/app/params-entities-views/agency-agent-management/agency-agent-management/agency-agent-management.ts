import { Component, inject, signal } from '@angular/core';
import { combineLatest } from 'rxjs';
import { MatExpansionPanel, MatAccordion, MatExpansionPanelHeader, MatExpansionPanelTitle } from "@angular/material/expansion";
import { AsyncPipe } from '@angular/common';
import { AgencyService } from '../../../services/agency-service';
import { AgencyAgentTableList } from '../agency-agent-table-list/agency-agent-table-list';
import { AgencyAgentForm } from '../agency-agent-form/agency-agent-form';
import { AgencyAgentService } from '../../../services/agency-agent-service';
import { AuditHistory } from "../../../global/audit-history/audit-history";

@Component({
  selector: 'app-agency-agent-management',
  imports: [AsyncPipe, MatExpansionPanel, MatAccordion, MatExpansionPanelHeader,
    MatExpansionPanelTitle, AgencyAgentForm, AgencyAgentTableList, AuditHistory],  
    templateUrl: './agency-agent-management.html',
  styleUrl: './agency-agent-management.scss',
})
export class AgencyAgentManagement {
  readonly formOpenState = signal(false);
  agencyService = inject(AgencyService);
  agencyAgentService = inject(AgencyAgentService);

  agencyAgentsDatas$ = combineLatest({
    agencies: this.agencyService.agenciesResp$,
    agencyAgents: this.agencyAgentService.agencyAgentsResp$,
    audits: this.agencyAgentService.agencyAgentAuditsResp$
  });

}
