import { Component, inject, signal } from '@angular/core';
import { CityTableList } from "../city-table-list/city-table-list";
import { MatExpansionModule } from '@angular/material/expansion';
import { MatGridListModule } from '@angular/material/grid-list';
import { CityForm } from "../city-form/city-form";
import { A11yModule } from "@angular/cdk/a11y";
import { combineLatest } from 'rxjs';
import { CityService } from '../../../services/city-service';
import { AsyncPipe } from '@angular/common';
import { AuditHistory } from "../../../global/audit-history/audit-history";

@Component({
  selector: 'app-city-management',
  imports: [AsyncPipe, CityTableList, MatExpansionModule, CityForm, MatGridListModule, A11yModule, AuditHistory],
  templateUrl: './city-management.html',
  styleUrl: './city-management.scss',
})
export class CityManagement {
  readonly formOpenState = signal(false);
  cityService = inject(CityService);
  citiesDatas$ = combineLatest({
    cities: this.cityService.citiesResp$,
    cityAudits: this.cityService.cityAuditsResp$
  })
}
