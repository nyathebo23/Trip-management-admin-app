import { Component, inject, Input } from '@angular/core';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogRef,
} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { MatDivider } from "@angular/material/divider";

@Component({
  selector: 'app-confirm-delete-dialog',
  imports: [MatDialogTitle, MatDialogContent, MatDialogActions, MatButtonModule, MatDivider],
  templateUrl: './confirm-delete-dialog.html',
  styleUrl: './confirm-delete-dialog.scss',
})
export class ConfirmDeleteDialog {
  readonly dialogRef = inject(MatDialogRef<ConfirmDeleteDialog>);
  readonly data = inject<DeleteDialogData>(MAT_DIALOG_DATA);

  closeDialog() {
    this.dialogRef.close();
  }

  onConfirm() {
    this.data.deleteFunction(this.data.objectId);
  }
}
