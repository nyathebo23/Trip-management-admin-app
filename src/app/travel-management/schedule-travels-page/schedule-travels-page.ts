import { Component, inject } from '@angular/core';
import { TravelForm } from "../travel-form/travel-form";
import { ScheduleTravelsTable } from '../schedule-travels-table/schedule-travels-table';
import { AgencyService } from '../../services/agency-service';
import { catchError, combineLatest, map, of } from 'rxjs';
import { getErrorType, ResponseState, toResponseState } from '../../utils/response';
import { HttpErrorResponse } from '@angular/common/http';
import { Agency } from '../../models/agency';
import { BusService } from '../../services/bus-service';
import { BusDriverService } from '../../services/bus-driver-service';
import { Bus } from '../../models/bus';
import { BusDriver } from '../../models/bus-driver';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-schedule-travels-page',
  imports: [AsyncPipe, TravelForm, ScheduleTravelsTable],
  templateUrl: './schedule-travels-page.html',
  styleUrl: './schedule-travels-page.scss',
})
export class ScheduleTravelsPage {

  agencyService = inject(AgencyService);
  busService = inject(BusService);
  busDriverService = inject(BusDriverService);

  agenciesResp$ = toResponseState<Agency>(this.agencyService.getAll());
  busesResp$ = toResponseState<Bus>(this.busService.getAll());
  driverResp$ = toResponseState<BusDriver>(this.busDriverService.getAll());

  state$ = combineLatest([this.agenciesResp$, this.busesResp$, this.driverResp$]);
}
