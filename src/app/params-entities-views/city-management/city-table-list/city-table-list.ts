import { Component, inject, input } from '@angular/core';
import { MatPaginatorModule} from '@angular/material/paginator';
import { MatTableModule} from '@angular/material/table'; 
import {MatIconModule} from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { MatCardModule } from "@angular/material/card";
import { CityEditDialog } from '../city-edit-dialog/city-edit-dialog';
import { CityService } from '../../../services/city-service';
import { City } from '../../../models/city';

@Component({
  selector: 'app-city-table-list',
  imports: [MatPaginatorModule, MatTableModule, MatIconModule, MatButtonModule, MatCardModule],
  templateUrl: './city-table-list.html',
  styleUrl: './city-table-list.scss',
})
export class CityTableList {

  displayedColumns: string[] = ['Name', 'Options'];

  cityService  = inject(CityService);
  readonly deleteDialog = inject(MatDialog);
  readonly editDialog = inject(MatDialog);
  cities = input.required<City[]>();

  editItem(city: City) {
    this.editDialog.open(CityEditDialog, {
      data: city
    });
  }

}
