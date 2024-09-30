import {Component, OnInit} from '@angular/core';
import {AdminService} from "../../service/admin.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatCard, MatCardContent} from "@angular/material/card";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef, MatRowDef,
  MatTable
} from "@angular/material/table";
import {MatMenu, MatMenuItem, MatMenuModule} from "@angular/material/menu";
import {MatButton, MatButtonModule} from "@angular/material/button";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [
    MatCard,
    MatCardContent,
    MatTable,
    MatCell,
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

  displayedColumns: string[] = ['trackingId', 'userName', 'amount', 'description', 'address', 'date', 'status', 'action'];
}
