import { Component, inject, signal } from '@angular/core';
import { CityService } from '../../services/city-service';
import { toResponseState } from '../../utils/response';
import { MatExpansionPanel, MatAccordion, MatExpansionPanelHeader, MatExpansionPanelTitle, MatExpansionPanelDescription } from "@angular/material/expansion";
import { AgencyForm } from "../agency-form/agency-form";
import { AgencyTableList } from "../agency-table-list/agency-table-list";
import { AsyncPipe } from '@angular/common';
import { ICity } from '../../city-management/interfaces/icity';

@Component({
  selector: 'app-agency-management',
  imports: [AsyncPipe, MatExpansionPanel, MatAccordion, MatExpansionPanelHeader, MatExpansionPanelTitle, 
    MatExpansionPanelDescription, AgencyForm, AgencyTableList],
  templateUrl: './agency-management.html',
  styleUrl: './agency-management.scss',
})
export class AgencyManagement {
  readonly formOpenState = signal(false);
  cityService = inject(CityService);
  citiesResp$ = toResponseState<ICity>(this.cityService.getAll());

}
