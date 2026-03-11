import { Component, inject } from '@angular/core';
import { MatPaginatorModule} from '@angular/material/paginator';
import { MatTableModule} from '@angular/material/table'; 
import {AsyncPipe} from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import { catchError, map, Observable, of } from 'rxjs';
import { CityService } from '../../services/city-service';
import { HttpErrorResponse } from '@angular/common/http';
import { getErrorType, ResponseState } from '../../utils/response';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDeleteDialog } from '../../global/confirm-delete-dialog/confirm-delete-dialog';
import {MatButtonModule} from '@angular/material/button';
import { MatCardModule } from "@angular/material/card";
import { CityEditDialog } from '../city-edit-dialog/city-edit-dialog';
import { ICity } from '../interfaces/icity';

@Component({
  selector: 'app-city-table-list',
  imports: [AsyncPipe, MatPaginatorModule, MatTableModule, MatIconModule, MatButtonModule, MatCardModule],
  templateUrl: './city-table-list.html',
  styleUrl: './city-table-list.scss',
})
export class CityTableList {

  displayedColumns: string[] = ['Name', 'Options'];

  cityService  = inject(CityService);
  readonly deleteDialog = inject(MatDialog);
  readonly editDialog = inject(MatDialog);
  citiesResp$ = this.cityService.citiesResp$;


  editItem(city: ICity) {
    this.editDialog.open(CityEditDialog, {
      data: city
    });
  }

}
