import {Component, OnInit} from '@angular/core';
import {AdminService} from "../../service/admin.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatCardContent, MatCardModule} from "@angular/material/card";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef, MatRowDef,
  MatTableModule
} from "@angular/material/table";
import {MatMenu, MatMenuItem, MatMenuModule} from "@angular/material/menu";
import {MatButton, MatButtonModule} from "@angular/material/button";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {RouterLink} from "@angular/router";
import {MatPrefix} from "@angular/material/form-field";

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [
    MatCardModule,
    MatCardContent,
    MatTableModule,
    MatCell,
    MatPrefix,
    MatCellDef,
    MatHeaderCell,
    MatHeaderCellDef,
    MatColumnDef,
    MatMenu,
    MatButton,
    MatMenuItem,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRowDef,
    MatDatepickerModule,
    ReactiveFormsModule,
    CommonModule,
    MatMenuModule,
    MatButtonModule,
    RouterLink,
  ],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent implements OnInit{

  orders: any;

  constructor(
    private adminService: AdminService,
    private snackBar: MatSnackBar,
  ){}

  ngOnInit(){
    this.getPlaceOrders();
  }

  getPlaceOrders(){
    this.adminService.getPlaceOrders().subscribe(res => {
      this.orders = res})
  }

  changeOrderStatus(orderId: number, status:string){
    this.adminService.changeOrderStatus(orderId, status).subscribe(res => {
     if(res.id != null){
       this.snackBar.open("Order Status changed successfully",'Close',{ duration: 5000,})
       this.getPlaceOrders();
     } else {
       this.snackBar.open("Something went wrong", "Close",{ duration: 5000,})
     }
    })
  }
}
