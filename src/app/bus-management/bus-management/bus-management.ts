import { Component, signal } from '@angular/core';
import { MatExpansionPanel, MatExpansionPanelTitle, MatExpansionPanelHeader, MatAccordion, MatExpansionPanelDescription } from "@angular/material/expansion";
import { BusTableList } from "../bus-table-list/bus-table-list";
import { BusForm } from "../bus-form/bus-form";

@Component({
  selector: 'app-bus-management',
  imports: [MatExpansionPanel, MatExpansionPanelTitle, MatExpansionPanelHeader, MatAccordion, MatExpansionPanelDescription, BusTableList, BusForm],
  templateUrl: './bus-management.html',
  styleUrl: './bus-management.scss',
})
export class BusManagement {
  readonly formOpenState = signal(false);
}
