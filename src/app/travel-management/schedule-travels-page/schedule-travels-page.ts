import { Component, inject, input } from '@angular/core';
import { TravelForm } from "../travel-form/travel-form";
import { ScheduleTravelsTable } from '../schedule-travels-table/schedule-travels-table';
import { Agency } from '../../models/agency';
import { Bus } from '../../models/bus';
import { BusDriver } from '../../models/bus-driver';

@Component({
  selector: 'app-schedule-travels-page',
  imports: [TravelForm, ScheduleTravelsTable],
  templateUrl: './schedule-travels-page.html',
  styleUrl: './schedule-travels-page.scss',
})
export class ScheduleTravelsPage {

  agencies = input.required<Agency[]>();
  buses = input.required<Bus[]>();
  busDrivers = input.required<BusDriver[]>();

}
