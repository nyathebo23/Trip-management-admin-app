import { Component, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatDivider } from '@angular/material/divider';
import { CityService } from '../../services/city-service';
import { form, FormField, required } from '@angular/forms/signals';
import { shouldNotStartWithSpace } from '../../utils/validation-rules';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { getErrorMessage } from '../../utils/response';
import { ICity } from '../interfaces/icity';
import { CityData } from '../interfaces/city-data';

@Component({
  selector: 'app-city-edit-dialog',
  imports: [MatDialogTitle, MatDialogContent, MatDialogActions, MatButtonModule, MatDivider,
    FormField, MatInputModule, MatFormFieldModule, ReactiveFormsModule
  ],
  templateUrl: './city-edit-dialog.html',
  styleUrl: './city-edit-dialog.scss',
})
export class CityEditDialog {
  readonly dialogRef = inject(MatDialogRef<CityEditDialog>);
  data = inject<ICity>(MAT_DIALOG_DATA);
  errorMessage = signal<string | null>(null);
  cityService  = inject(CityService)
  cityModel = signal<CityData>({
    name: this.data.name
  });

  cityForm = form(this.cityModel, (schemaPath) => {
    required(schemaPath.name, {message: "City name is required"}),
    shouldNotStartWithSpace(schemaPath.name, {message: "City name shouldn't start with space"});
  });
  closeDialog() {
    this.dialogRef.close();
  }

  submit() {
    this.cityService.update(this.data.id, this.cityModel()).subscribe({
      next: (res) => {
        this.errorMessage.set(null);
        this.dialogRef.close(true);
      },
      error: (err: HttpErrorResponse) => {
        this.errorMessage.set(getErrorMessage(err));
      }
    });
  }
}
