import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, RouterLink} from "@angular/router";
import {CustomerService} from "../../services/customer.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {CommonModule, CurrencyPipe, NgForOf, NgIf} from "@angular/common";
import {ReactiveFormsModule} from "@angular/forms";
import {UserStorageService} from "../../../service/storage/user-storage.service";
import {MatIcon} from "@angular/material/icon";

@Component({
  selector: 'app-view-product-detail',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    CurrencyPipe,
    RouterLink,
    MatIcon
  ],
  templateUrl: './view-product-detail.component.html',
  styleUrl: './view-product-detail.component.scss'
})
export class ViewProductDetailComponent implements OnInit{

  productId: number;

  product: any;
  FAQS: any[] = [];
  reviews: any[] = [];

  constructor(
    private activatedroute: ActivatedRoute,
    private customerService: CustomerService,
    private snackBar: MatSnackBar) {}

  ngOnInit(): void {
        this.productId = this.activatedroute.snapshot.params['productId'];

        this.getProductDetailById();
  }

  getProductDetailById(){
    this.customerService.getProductDetailById(this.productId).subscribe(res =>{
      this.product = res.productDto;
      this.product.processedImg ='data:image/png;base64,'+ res.productDto.byteImg;

      this.FAQS = res.faqDtoList;
      console.log(this.FAQS);

      res.reviewDtoList.forEach(element =>{
        element.processedImg = 'data:image/png;base64,'+ element.returnedImg;
        this.reviews.push(element)
      })
    })
  }

  addToWishlist(){
    const wishListDto ={
      productId: this.productId,
      userId: UserStorageService.getUserId()
    }
    this.customerService.addProductToWishlist(wishListDto).subscribe(res=>{
      if(res.id != null){
        this.snackBar.open('Product Added to Wishlist Successfully!', 'Close',{
          duration:5000})
      }else {
        this.snackBar.open("Already in Wishlist", "ERROR",{
          duration:5000})
      }
    })
  }
}
