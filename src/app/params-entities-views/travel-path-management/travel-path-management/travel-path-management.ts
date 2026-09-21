import { Component, inject, signal } from '@angular/core';
import { Agency } from '../../../models/agency';
import { AgencyService } from '../../../services/agency-service';
import { toResponseState } from '../../../utils/response';
import { TravelPathForm } from '../travel-path-form/travel-path-form';
import { TravelPathTableList } from '../travel-path-table-list/travel-path-table-list';
import { MatAccordion, MatExpansionPanel, MatExpansionPanelHeader, 
  MatExpansionPanelTitle } from '@angular/material/expansion';
import { AsyncPipe } from '@angular/common';
import { combineLatest } from 'rxjs';
import { TravelPathService } from '../../../services/travel-path-service';
import { AuditHistory } from '../../../global/audit-history/audit-history';

@Component({
  selector: 'app-travel-path-management',
  imports: [AsyncPipe, MatExpansionPanel, MatAccordion, MatExpansionPanelHeader, 
    MatExpansionPanelTitle, TravelPathTableList, TravelPathForm, AuditHistory],
  templateUrl: './travel-path-management.html',
  styleUrl: './travel-path-management.scss',
})
export class TravelPathManagement {
  readonly formOpenState = signal(false);
  agencyService = inject(AgencyService);
  travelPathService = inject(TravelPathService);
  travelPathsDatas$ = combineLatest({
    travelPaths: this.travelPathService.travelPathsResp$,
    travelPathAudits: this.travelPathService.travelPathAuditsResp$,
    agencies: this.agencyService.agenciesResp$,
  })
}
