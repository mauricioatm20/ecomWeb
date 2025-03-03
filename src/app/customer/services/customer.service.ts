import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {UserStorageService} from "../../service/storage/user-storage.service";

const BASIC_URL = "https://34.247.92.13/";
//const BASIC_URL = "http://localhost:8080/";
//const BASIC_URL = "https://glorious-gratitude-production.up.railway.app/"

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(
    private http: HttpClient) { }

  getAllProducts():Observable<any> {
    return this.http.get(BASIC_URL + 'api/customer/products',{
      headers: this.createAuthorizationHeader(),
    })
  }

  getAllProductsByName(name: any):Observable<any> {
    return this.http.get(BASIC_URL + `api/customer/search/${name}`,{
      headers: this.createAuthorizationHeader(),
    })
  }

  addToCart(productId: any):Observable<any> {
    const cartDto={
      productId:productId,
      userId:UserStorageService.getUserId()
    }
    return this.http.post(BASIC_URL + 'api/customer/cart', cartDto ,{
      headers: this.createAuthorizationHeader(),
    })
  }

  increaseProductQuantity(productId: any):Observable<any> {
    const cartDto={
      productId:productId,
      userId:UserStorageService.getUserId()
    }
    return this.http.post(BASIC_URL + 'api/customer/addition', cartDto ,{
      headers: this.createAuthorizationHeader(),
    })
  }

  decreaseProductQuantity(productId: any):Observable<any> {
    const cartDto={
      productId:productId,
      userId:UserStorageService.getUserId()
    }
    return this.http.post(BASIC_URL + 'api/customer/deduction', cartDto ,{
      headers: this.createAuthorizationHeader(),
    })
  }

  removeProductFromCart(productId: any): Observable<any> {
    const userId = UserStorageService.getUserId(); // Obtener el ID del usuario
    return this.http.delete(`${BASIC_URL}api/customer/cart/${userId}/product/${productId}`, {
      headers: this.createAuthorizationHeader(),
    });
  }

  placeOrder(orderDto:any):Observable<any> {
   orderDto.userId = UserStorageService.getUserId()
    return this.http.post(BASIC_URL + 'api/customer/placeOrder', orderDto ,{
      headers: this.createAuthorizationHeader(),
    })
  }

  getOrdersByUserId():Observable<any> {
    const userId = UserStorageService.getUserId()
    return this.http.get(BASIC_URL + `api/customer/myOrders/${userId}` ,{
      headers: this.createAuthorizationHeader(),
    })
  }

  getOrderedProducts(orderId:number):Observable<any> {
    return this.http.get(BASIC_URL + `api/customer/ordered-products/${orderId}` ,{
      headers: this.createAuthorizationHeader(),
    })
  }

  giveReview(reviewDto:number):Observable<any> {
    return this.http.post(BASIC_URL + `api/customer/review`, reviewDto , {
      headers: this.createAuthorizationHeader(),
    })
  }

  getCartByUserId():Observable<any> {
   const userId=UserStorageService.getUserId();
    return this.http.get(BASIC_URL + `api/customer/cart/${userId}` ,{
      headers: this.createAuthorizationHeader(),
    })
  }

  applyCoupon(code:any):Observable<any> {
    const userId=UserStorageService.getUserId();
    return this.http.get(BASIC_URL + `api/customer/coupon/${userId}/${code}` ,{
      headers: this.createAuthorizationHeader(),
    })
  }

  getProductDetailById(productId: number) : Observable<any>{
    return this.http.get(BASIC_URL + `api/customer/product/${productId}`,{
      headers: this.createAuthorizationHeader(),
    })
  }

  addProductToWishlist(wishlistDto:any):Observable<any> {
    return this.http.post(BASIC_URL + `api/customer/wishlist`, wishlistDto , {
      headers: this.createAuthorizationHeader(),
    })
  }

  getWishlistByUserId():Observable<any> {
    const userId=UserStorageService.getUserId();
    return this.http.get(BASIC_URL + `api/customer/wishlist/${userId}` ,{
      headers: this.createAuthorizationHeader(),
    })
  }

  private createAuthorizationHeader(): HttpHeaders {
    return new HttpHeaders().set('Authorization', 'Bearer ' + UserStorageService.getToken())
  }
}
