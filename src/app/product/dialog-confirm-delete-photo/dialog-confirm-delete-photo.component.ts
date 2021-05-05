import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Photo } from 'src/app/_models/photo';
import { DetailsComponent } from '../details/details.component';

export interface DialogData {
  type: number;
  data: Photo;
}

@Component({
  selector: 'app-dialog-confirm-delete-photo',
  templateUrl: './dialog-confirm-delete-photo.component.html',
  styleUrls: ['./dialog-confirm-delete-photo.component.css']
})
export class DialogConfirmDeletePhotoComponent {
    public title: string;
    public message: string;
  constructor(
    public dialogRef: MatDialogRef<DetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: DialogData
  ) { 
    this.title = this.dialogData.type == 0 ? "Delete" : "Update";
    this.message = this.dialogData.type == 0 ? "Delete image form server?" : "Set image is main form server?";
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
