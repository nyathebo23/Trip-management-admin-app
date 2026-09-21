import { Component, inject, signal } from '@angular/core';
import { MatExpansionPanel, MatExpansionPanelTitle, MatExpansionPanelHeader, MatAccordion } from "@angular/material/expansion";
import { BusDriverForm } from '../bus-driver-form/bus-driver-form';
import { BusDriverTableList } from '../bus-driver-table-list/bus-driver-table-list';
import { BusDriverService } from '../../../services/bus-driver-service';
import { combineLatest } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { AuditHistory } from "../../../global/audit-history/audit-history";

@Component({
  selector: 'app-bus-driver-management',
  imports: [AsyncPipe, MatExpansionPanel, MatExpansionPanelTitle, MatExpansionPanelHeader,
    MatAccordion, BusDriverForm, BusDriverTableList, AuditHistory],
  templateUrl: './bus-driver-management.html',
  styleUrl: './bus-driver-management.scss',
})
export class BusDriverManagement {
    readonly formOpenState = signal(false);
    busDriverService = inject(BusDriverService);
    busDriversDatas$ = combineLatest({
        busDrivers: this.busDriverService.busDriversResp$,
        busDriverAudits: this.busDriverService.busDriverAuditsResp$
    });

}
