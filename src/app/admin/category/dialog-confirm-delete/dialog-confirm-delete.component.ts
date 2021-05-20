import { Component, OnInit, Inject } from '@angular/core';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Category } from 'src/app/_models/category';

import { ListComponent } from '../list/list.component';

@Component({
  selector: 'app-dialog-confirm-delete',
  templateUrl: './dialog-confirm-delete.component.html',
  styleUrls: ['./dialog-confirm-delete.component.css']
})
export class DialogConfirmDeleteComponent {

  constructor(
    public dialogRef: MatDialogRef<ListComponent>,
    @Inject(MAT_DIALOG_DATA) public category: Category
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
