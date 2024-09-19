import {Component, OnInit} from '@angular/core';
import {CustomerService} from "../../services/customer.service";
import {FormBuilder} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {CommonModule, CurrencyPipe, NgClass} from "@angular/common";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";

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

  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit{

  cartItems: any[]= [];
  order: any;

  constructor(
    private customerService: CustomerService,
    private fb: FormBuilder,
    private dialog: MatDialog,
  ){}

  ngOnInit():void {
    this.getCart();
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
}
