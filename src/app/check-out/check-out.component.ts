import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartItem } from '../_models/cart-item';
import { AccountService } from '../_services/account.service';
import { CartService } from '../_services/cart.service';
import { DeliveryType } from 'src/app/_models/delivery-type';
import { PaymentType } from 'src/app/_models/payment-type';
import { UtilService } from '../_services/utils.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { OrderService } from '../_services/order.service';
import { SelectionModel } from '@angular/cdk/collections';
import { DialogPaymentComponent } from '../dialog/dialog-payment/dialog-payment.component';
import { MatDialog } from '@angular/material/dialog';
import { OrderSucess } from 'src/app/_models/order-success';

export class TransactionPayment {
  transactionId: string;
  isSuccess: boolean;
}

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit {
  dataSource = new MatTableDataSource<CartItem>();
  displayedColumns: string[] = ['num', 'photo', 'productName', 'price', 'quantity', 'amount'];
  selection = new SelectionModel(true, []);

  deliveryTypes: DeliveryType[];
  paymentTypes: PaymentType[];
  shippingForm: FormGroup;
  paymentForm: FormGroup;
  ordersSuccess = new OrderSucess();
  isLinear = true; 
  paymentTypeSelected = new PaymentType();
  messageSuccess = "Waiting for payment..."
  dataTransaction = new TransactionPayment();

  constructor(
    private accountService: AccountService,
    private cartService: CartService,
    private orderService: OrderService,
    private appUtilService: UtilService,
    private router: Router,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
  ) { }


  ngOnInit(): void {

    this.shippingForm = this.formBuilder.group({
      deliveryTypeId: ['1', Validators.required],
      firstName: 'Duy',
      lastName: ['Phong', Validators.required],
      companyName: 'Aptech Viet Nam',
      contry: ['Viet Nam', Validators.required],
      streetAddress: ['24 Phan liem, district 1', Validators.required],
      postCode: '70000',
      city: ['Ho Chi Minh', Validators.required],
      phoneNumber: ['0987123123', Validators.required],
      orderNote: 'Ship to Viet Nam ... note'
    });

    this.paymentForm = this.formBuilder.group({
      paymentTypeId: ['2', Validators.required],
      orderNumber: new FormControl({ value: null, disabled: true }, Validators.required),
      amount: new FormControl({ value: null, disabled: true }, Validators.required),
      cartNumber: ['11231231235654', Validators.required],
      cartHolderName: ['DUY PHONG', Validators.required],
      validUntil: new FormControl(),
      cvv: ['888999', Validators.required]
    });

    this.accountService.currentUser$.subscribe(x => {
      if (x == null) {
        this.toastr.warning("Please login for checkout", "warning")
        this.router.navigateByUrl('signin');
      }
    });

    this.cartService.currentCart$.subscribe(x => {
      if (x == null || x.length == 0) {
        this.emptyCartProcess();
        return
      }
      this.dataSource = new MatTableDataSource(x);
    }).unsubscribe();

    this.appUtilService.getDeliveryType().subscribe(x => this.deliveryTypes = x);
    this.appUtilService.getPaymentType().subscribe(x => this.paymentTypes = x);
  }

  getTotalAmount() {
    return this.dataSource.data.length == 0
      ? 0
      : this.dataSource.data.map(x => x.price * x.quantity).reduce((acc, value) => acc + value);
  }

  getTotalQuantity() {
    return this.dataSource.data.length == 0
      ? 0
      : this.dataSource.data.map(x => x.quantity).reduce((acc, value) => acc + value);
  }

  submitShipping() {
    if (!this.shippingForm.valid) {
      this.toastr.warning("Check require field", "Warning")
      return;
    }
    if (this.ordersSuccess.orderNumber != null) {
      return;
    }

    const master = this.shippingForm.value;
    const details = this.dataSource.data;

    if (details == null || details.length == 0) {
      this.emptyCartProcess();
      return;
    }

    const data = {
      order: master,
      details: details
    }

    this.orderService.save(data).subscribe(x => {  
      this.ordersSuccess = x;
      this.toastr.success("Created Order", "Success");
      this.paymentForm.controls['orderNumber'].setValue(x.orderNumber);
      this.paymentForm.controls['amount'].setValue(x.amount);
      this.cartService.clearCarts();
    });
  }

  submitPayment() {
    if (!this.paymentForm.valid || this.paymentTypeSelected.id == null) {
      this.toastr.warning("Check require field", "Warning")
      return;
    }

    if(this.paymentTypeSelected.isPaid) {
      const dialogRef = this.dialog.open(DialogPaymentComponent, {
        width: '300px',
        data: {
          orderNumber: this.ordersSuccess.orderNumber,
          amount: this.ordersSuccess.amount
        }
      });

      dialogRef.afterClosed().subscribe((result: TransactionPayment) => {
        if (result) {
          this.messageSuccess = "Success";
          this.dataTransaction = result;

          const postData = {
            paymentTypeId: this.paymentTypeSelected.id,
            orderNumber: this.ordersSuccess.orderNumber,
            amount: this.ordersSuccess.amount,
            cartNumber: this.paymentTypeSelected.isPaid ? this.paymentForm.get('cartNumber').value : null,
            cartHolderName: this.paymentTypeSelected.isPaid ? this.paymentForm.get('cartHolderName').value : null,
            validUntil: this.paymentTypeSelected.isPaid ? this.paymentForm.get('validUntil').value : null,
            cvv: this.paymentTypeSelected.isPaid ? this.paymentForm.get('cvv').value : null,
            transactionId: this.dataTransaction.transactionId,
            isSuccess: this.dataTransaction.isSuccess,
          }
          this.orderService.payment(postData).subscribe(x => this.toastr.success("Sucess"));
        }
      });
    }
    

  }

  emptyCartProcess() {
    this.toastr.info('Cart is Empty!!');
    this.router.navigateByUrl("/cart");
  }
}
