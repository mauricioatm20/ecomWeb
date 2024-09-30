import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {CustomerService} from "../../services/customer.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatDialog} from "@angular/material/dialog";
import { Router} from "@angular/router";
import {MatCard, MatCardContent, MatCardTitle} from "@angular/material/card";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-place-order',
  standalone: true,
  imports: [
    MatCard,
    MatCardTitle,
    MatCardContent,
    MatFormField,
    MatLabel,
    MatError,
    ReactiveFormsModule,
    MatInput,
    MatButton,
    CommonModule,
  ],
  templateUrl: './place-order.component.html',
  styleUrl: './place-order.component.scss'
})
export class PlaceOrderComponent implements OnInit {

  orderForm!: FormGroup;

  constructor(
    private customerService: CustomerService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private router: Router) {}

  ngOnInit(): void {
    this.orderForm = this.fb.group({
      address:[null, [Validators.required]],
      orderDescription:[null],
    })
  }

  placeOrder(){
    this.customerService.placeOrder(this.orderForm.value).subscribe(res => {
      if(res.id != null){
        this.snackBar.open("Order placed successfull", "Close", {duration: 5000});
        this.router.navigateByUrl("customer/my-orders");
        this.closeForm();
      }else {
        this.snackBar.open("Something went wrong", "Close", {duration: 5000});
      }
    })
  }
  closeForm(){
    this.dialog.closeAll();
  }
}
