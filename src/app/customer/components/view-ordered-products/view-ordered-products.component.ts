import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {CustomerService} from "../../services/customer.service";

@Component({
  selector: 'app-view-ordered-products',
  standalone: true,
  imports: [],
  templateUrl: './view-ordered-products.component.html',
  styleUrl: './view-ordered-products.component.css'
})
export class ViewOrderedProductsComponent implements OnInit{

  constructor(
    private activatedroute: ActivatedRoute,
    private customerService: CustomerService,
  ) {}

  orderId: any ;
  orderedProductDetailsList =[];
  totalAmount:any;


  ngOnInit(): void {

    this.activatedroute.snapshot.params['orderId'];

    this.getOrderedProductsDetailsbyOrderId();
  }

  getOrderedProductsDetailsbyOrderId(){
    this.customerService.getOrderedProducts((this.orderId).subscribe(res =>{
      res.productDtoList.forEach(element =>{
        element.processedImg = 'data:image/jpeg;base64,' + element.byteImg;
        this.orderedProductDetailsList.push(element)
      });
      this.totalAmount = res.orderAmount;
    }))
  }
}
