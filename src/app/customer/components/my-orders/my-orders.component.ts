import {Component, OnInit} from '@angular/core';
import {CustomerService} from "../../services/customer.service";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow, MatRow,
  MatTableModule
} from "@angular/material/table";
import {RouterLink, RouterModule} from "@angular/router";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {CommonModule, DatePipe} from "@angular/common";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-my-orders',
  standalone: true,
  imports: [
    MatTableModule,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderCellDef,
    MatCell,
    MatCellDef,
    MatHeaderRow,
    MatRow,
    RouterLink,
    RouterModule,
    DatePipe,
    MatButton,
    CommonModule
  ],
  templateUrl: './my-orders.component.html',
  styleUrl: './my-orders.component.scss'
})
export class MyOrdersComponent implements OnInit {

  myOrders:any;
  constructor(
    private customerService: CustomerService,
  ){}

  ngOnInit() {
    this.getMyOrders();
  }

  getMyOrders(){
    this.customerService.getOrdersByUserId().subscribe(res=>{
      this.myOrders = res;
    })
  }

}
