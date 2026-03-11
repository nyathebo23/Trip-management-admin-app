import { Component, inject } from '@angular/core';
import { AgencyService } from '../../services/agency-service';
import { combineLatest } from 'rxjs';
import { ResponseState, toResponseState } from '../../utils/response';

import { Agency } from '../../models/agency';
import { BusService } from '../../services/bus-service';
import { BusDriverService } from '../../services/bus-driver-service';
import { Bus } from '../../models/bus';
import { BusDriver } from '../../models/bus-driver';
import { AsyncPipe } from '@angular/common';
import { CityService } from '../../services/city-service';
import { City } from '../../models/city';
import {MatTabsModule} from '@angular/material/tabs';
import { ScheduleTravelsPage } from "../schedule-travels-page/schedule-travels-page";
import { TravelsByAgency } from "../travels-by-agency/travels-by-agency";
import { TravelsCityCity } from '../travels-city-city/travels-city-city';
import { TravelCreateByBatch } from "../travel-create-by-batch/travel-create-by-batch";

@Component({
  selector: 'app-travel-management-page',
  imports: [MatTabsModule, AsyncPipe, ScheduleTravelsPage, TravelsByAgency, TravelsCityCity, TravelCreateByBatch],
  templateUrl: './travel-management-page.html',
  styleUrl: './travel-management-page.scss',
})
export class TravelManagementPage {
  agencyService = inject(AgencyService);
  busService = inject(BusService);
  busDriverService = inject(BusDriverService);
  cityService = inject(CityService)

  agenciesResp$ = toResponseState<Agency>(this.agencyService.getAll());
  busesResp$ = toResponseState<Bus>(this.busService.getAll());
  driverResp$ = toResponseState<BusDriver>(this.busDriverService.getAll());
  cityResp$ = toResponseState<City>(this.cityService.getAll());
  
  state$ = combineLatest({
    agencies: this.agenciesResp$, 
    buses: this.busesResp$, 
    drivers: this.driverResp$,
    cities: this.cityResp$
  });
}

