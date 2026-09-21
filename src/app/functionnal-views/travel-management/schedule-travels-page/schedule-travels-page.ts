import { Component, input } from '@angular/core';
import { TravelForm } from "../travel-form/travel-form";
import { ScheduleTravelsTable } from '../schedule-travels-table/schedule-travels-table';
import { Agency } from '../../../models/agency';
import { Bus } from '../../../models/bus';
import { BusDriver } from '../../../models/bus-driver';
import { TravelPathDetails } from '../../../models/travel-path-details';

@Component({
  selector: 'app-schedule-travels-page',
  imports: [TravelForm, ScheduleTravelsTable],
  templateUrl: './schedule-travels-page.html',
  styleUrl: './schedule-travels-page.scss',
})
export class ScheduleTravelsPage {

  agencies = input.required<Agency[]>();
  travelPaths = input.required<TravelPathDetails[]>();
  buses = input.required<Bus[]>();
  busDrivers = input.required<BusDriver[]>();
  
  
}
