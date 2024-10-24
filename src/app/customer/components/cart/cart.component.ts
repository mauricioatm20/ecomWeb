import {Component, OnInit} from '@angular/core';
import {CustomerService} from "../../services/customer.service";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {CommonModule, CurrencyPipe, NgClass} from "@angular/common";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import { PlaceOrderComponent } from '../place-order/place-order.component';


@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    NgClass,
    CurrencyPipe,
    MatIconButton,
    MatIcon,
    MatButton,
    CommonModule,
    ReactiveFormsModule,
    MatFormField,
    MatLabel,
    MatInput,
    MatError,

  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit{

  cartItems: any[]= [];
  order: any;
  couponForm: FormGroup;

  constructor(
    private customerService: CustomerService,
    private snackBar: MatSnackBar,
    private fb: FormBuilder,
    private dialog: MatDialog,
  ){}

  ngOnInit():void {
    this.couponForm = this.fb.group({
      code:[null, [Validators.required]],
    })
    this.getCart();
  }

  applyCoupon() {
    this.customerService.applyCoupon(this.couponForm.get(['code'])!.value).subscribe(res => {
      this.snackBar.open('Coupon Applied Successfully', 'Close', {duration: 5000});
      this.getCart();
    }, error => {
      this.snackBar.open(error.error, 'Close', {duration: 5000});
    })
  }


  getCart(){
    this.cartItems=[];
    this.customerService.getCartByUserId().subscribe(res => {
      this.order = res;
      res.cartItems.forEach(element => {
        element.processedImg = 'data:image/jpeg;base64,' + element.returnedImg;
        this.cartItems.push(element);
      })
    })
  }

  increaseQuantity(productId:any){
    this.customerService.increaseProductQuantity(productId).subscribe(res => {
      this.snackBar.open('Product Quantity Increased', 'Close', {duration: 5000});
      this.getCart();
    })
  }

  decreaseQuantity(productId:any){
    this.customerService.decreaseProductQuantity(productId).subscribe(res => {
      this.snackBar.open('Product Quantity Decreased', 'Close', {duration: 5000});
      this.getCart();
    })
  }

  placeOrder(){
    this.dialog.open(PlaceOrderComponent);
  }
}
