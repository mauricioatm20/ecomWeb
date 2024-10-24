import {Component, OnInit} from '@angular/core';
import {AdminService} from "../../service/admin.service";
import {OrderByStatusComponent} from "./order-by-status/order-by-status.component";
import {MatCard, MatCardAvatar, MatCardContent, MatCardHeader, MatCardTitle} from "@angular/material/card";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-analitycs',
  standalone: true,
  imports: [
    OrderByStatusComponent,
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardContent,
    MatCardAvatar,
    CommonModule
  ],
  templateUrl: './analitycs.component.html',
  styleUrl: './analitycs.component.scss'
})
export class AnalitycsComponent implements OnInit{

  data:any={};

  constructor(
    private adminService: AdminService) {}

  ngOnInit(){

    this.adminService.getAnalytics().subscribe(res =>{
      console.log(res);
      this.data = res;
    })
    }


}
