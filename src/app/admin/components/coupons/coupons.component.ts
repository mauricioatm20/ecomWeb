import {Component, OnInit} from '@angular/core';
import {AdminService} from "../../service/admin.service";
import {MatCard, MatCardContent} from "@angular/material/card";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow, MatRow,
  MatTableModule
} from "@angular/material/table";
import {CommonModule} from "@angular/common";
import {ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-coupons',
  standalone: true,
  imports: [
    MatCard,
    MatCardContent,
    MatTableModule,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderCellDef,
    MatCell,
    MatCellDef,
    MatHeaderRow,
    MatRow,
    CommonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './coupons.component.html',
  styleUrl: './coupons.component.scss'
})
export class CouponsComponent implements OnInit{

  coupons: any;
  constructor(
    private adminService: AdminService,
  ){}

  ngOnInit(): void {
    this.getCoupons();
  }
  getCoupons(): void{
    this.adminService.getCoupons().subscribe(res => this.coupons = res);
  }
}
