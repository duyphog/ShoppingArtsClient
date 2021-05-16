import { Component, OnInit, Inject } from '@angular/core';
import { Account } from 'src/app/_models/account';
import { ListComponent } from '../list/list.component';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-dialog-confirm-delete',
  templateUrl: './dialog-confirm-delete.component.html',
  styleUrls: ['./dialog-confirm-delete.component.css']
})
export class DialogConfirmDeleteComponent  {

  constructor(
    public dialogRef: MatDialogRef<ListComponent>,
    @Inject(MAT_DIALOG_DATA) public account: Account
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
