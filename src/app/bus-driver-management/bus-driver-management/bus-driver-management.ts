import { Component, signal } from '@angular/core';
import { MatExpansionPanel, MatExpansionPanelTitle, MatExpansionPanelHeader, MatAccordion } from "@angular/material/expansion";
import { BusDriverForm } from '../bus-driver-form/bus-driver-form';
import { BusDriverTableList } from '../bus-driver-table-list/bus-driver-table-list';

@Component({
  selector: 'app-bus-driver-management',
  imports: [MatExpansionPanel, MatExpansionPanelTitle, MatExpansionPanelHeader,
     MatAccordion, BusDriverForm, BusDriverTableList],
  templateUrl: './bus-driver-management.html',
  styleUrl: './bus-driver-management.scss',
})
export class BusDriverManagement {
  readonly formOpenState = signal(false);
}
