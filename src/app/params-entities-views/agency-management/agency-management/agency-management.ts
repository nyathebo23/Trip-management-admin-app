import { Component, inject, signal } from '@angular/core';
import { CityService } from '../../../services/city-service';
import { toResponseState } from '../../../utils/response';
import { MatExpansionPanel, MatAccordion, MatExpansionPanelHeader, MatExpansionPanelTitle, MatExpansionPanelDescription } from "@angular/material/expansion";
import { AgencyForm } from "../agency-form/agency-form";
import { AgencyTableList } from "../agency-table-list/agency-table-list";
import { AsyncPipe } from '@angular/common';

import { AgencyService } from '../../../services/agency-service';
import { combineLatest } from 'rxjs';
import { AuditHistory } from "../../../global/audit-history/audit-history";

@Component({
  selector: 'app-agency-management',
  imports: [AsyncPipe, MatExpansionPanel, MatAccordion, MatExpansionPanelHeader, MatExpansionPanelTitle,
    MatExpansionPanelDescription, AgencyForm, AgencyTableList, AuditHistory],
  templateUrl: './agency-management.html',
  styleUrl: './agency-management.scss',
})
export class AgencyManagement {
  readonly formOpenState = signal(false);
  cityService = inject(CityService);
  agencyService = inject(AgencyService);
  agenciesDatas$ = combineLatest({
    agencies: this.agencyService.agenciesResp$,
    cities: this.cityService.citiesResp$,
    agencyAudits: this.agencyService.agencyAuditsResp$
  });
}
