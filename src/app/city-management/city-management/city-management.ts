import { Component, signal } from '@angular/core';
import { CityTableList } from "../city-table-list/city-table-list";
import {MatExpansionModule} from '@angular/material/expansion';
import {MatGridListModule} from '@angular/material/grid-list';

import { CityForm } from "../city-form/city-form";
import { A11yModule } from "@angular/cdk/a11y";

@Component({
  selector: 'app-city-management',
  imports: [CityTableList, MatExpansionModule, CityForm, MatGridListModule, A11yModule],
  templateUrl: './city-management.html',
  styleUrl: './city-management.scss',
})
export class CityManagement {
  readonly formOpenState = signal(false);
}
