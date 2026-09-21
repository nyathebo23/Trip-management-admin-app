import { Component, inject, signal } from '@angular/core';
import { MatExpansionPanel, MatExpansionPanelTitle, MatExpansionPanelHeader, MatAccordion, MatExpansionPanelDescription } from "@angular/material/expansion";
import { BusTableList } from "../bus-table-list/bus-table-list";
import { BusForm } from "../bus-form/bus-form";
import { combineLatest } from 'rxjs';
import { BusService } from '../../../services/bus-service';
import { AsyncPipe } from '@angular/common';
import { AuditHistory } from '../../../global/audit-history/audit-history';

@Component({
  selector: 'app-bus-management',
  imports: [AsyncPipe, MatExpansionPanel, MatExpansionPanelTitle, MatExpansionPanelHeader, MatAccordion, 
    MatExpansionPanelDescription, BusTableList, BusForm, AuditHistory],
  templateUrl: './bus-management.html',
  styleUrl: './bus-management.scss',
})
export class BusManagement {
  readonly formOpenState = signal(false);
  busService = inject(BusService);

  busesDatas$ = combineLatest({
    buses: this.busService.busesResp$,
    busAudits: this.busService.busAuditsResp$
  })
}
