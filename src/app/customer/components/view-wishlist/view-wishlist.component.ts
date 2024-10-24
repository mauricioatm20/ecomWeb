import {Component, OnInit} from '@angular/core';
import {CustomerService} from "../../services/customer.service";
import {NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-view-wishlist',
  standalone: true,
  imports: [
    NgForOf,
    NgIf
  ],
  templateUrl: './view-wishlist.component.html',
  styleUrl: './view-wishlist.component.scss'
})
export class ViewWishlistComponent implements OnInit{

  products: any[]=[];

  constructor(
    private customerService: CustomerService) {}

  ngOnInit(): void {
    this.getWishlistByUserId();
  }

  getWishlistByUserId(){
    this.customerService.getWishlistByUserId().subscribe(res=>{
      res.forEach(element =>{
        element.processedImg = 'data:image/jpeg;base64,' + element.returnedImg;
        this.products.push(element)
      })
    })
  }
}
