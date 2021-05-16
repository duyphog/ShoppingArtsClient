import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CheckOutComponent } from 'src/app/check-out/check-out.component';

export interface DialogData {
  orderNumber: string,
  amount: number,
  transactionId: string,
  pinCode: string
}

@Component({
  selector: 'app-dialog-payment',
  templateUrl: './dialog-payment.component.html',
  styleUrls: ['./dialog-payment.component.css']
})
export class DialogPaymentComponent {
  constructor(
    public dialogRef: MatDialogRef<CheckOutComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) { 
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  getData(){
    return {
      transactionId: "ASKDFNLAS2892HD0W9",
      isSuccess: true
    };
  }
}
