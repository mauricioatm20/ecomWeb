import { Routes } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {SignupComponent} from "./signup/signup.component";
import {DashboardComponent} from "./admin/components/dashboard/dashboard.component";
import {DashboardCComponent} from "./customer/components/dashboard-c/dashboard-c.component";
import {PostCategoryComponent} from "./admin/components/post-category/post-category.component";
import {PostProductComponent} from "./admin/components/post-product/post-product.component";
import {CartComponent} from "./customer/components/cart/cart.component";
import {PostCouponComponent} from "./admin/components/post-coupon/post-coupon.component";
import {CouponsComponent} from "./admin/components/coupons/coupons.component";
import {OrdersComponent} from "./admin/components/orders/orders.component";
import {PlaceOrderComponent} from "./customer/components/place-order/place-order.component";
import {MyOrdersComponent} from "./customer/components/my-orders/my-orders.component";
import {PostProductFaqComponent} from "./admin/components/post-product-faq/post-product-faq.component";
import {UpdateProductComponent} from "./admin/components/update-product/update-product.component";
import {
  ViewOrderedProductsComponent
} from "./customer/components/view-ordered-products/view-ordered-products.component";
import {
  ReviewOrderedProductComponent
} from "./customer/components/review-ordered-product/review-ordered-product.component";
import {ViewProductDetailComponent} from "./customer/components/view-product-detail/view-product-detail.component";
import {ViewWishlistComponent} from "./customer/components/view-wishlist/view-wishlist.component";
import {TrackOrderComponent} from "./track-order/track-order.component";
import {AnalitycsComponent} from "./admin/components/analytics/analitycs.component";


export const routes: Routes = [
  {path:"login",component: LoginComponent},
  {path:"signup",component: SignupComponent},
  {path:'order', component: TrackOrderComponent},

  {path: '', redirectTo: '/login', pathMatch: 'full' },// Redirige  por defecto

  {path: 'dashboard', component: DashboardComponent } ,// Ruta admin
  {path: 'admin/category', component: PostCategoryComponent},
  {path: 'admin/product', component: PostProductComponent},
  {path: 'admin/analytics', component:AnalitycsComponent},
  {path: 'admin/post-coupon', component: PostCouponComponent},
  {path: 'admin/coupons', component: CouponsComponent},
  {path: 'admin/orders', component: OrdersComponent},
  {path: 'admin/faq/:productId', component: PostProductFaqComponent},
  {path: 'admin/product/:productId', component: UpdateProductComponent},

  {path: 'dashboard-c', component: DashboardCComponent }, // Ruta customer
  {path: 'customer/cart', component: CartComponent},
  {path: 'customer/placeOrder', component: PlaceOrderComponent},
  {path: 'customer/my_orders', component: MyOrdersComponent},
  {path: 'customer/ordered_products/:orderId', component: ViewOrderedProductsComponent},
  {path: 'customer/review/:productId', component: ReviewOrderedProductComponent},
  {path: 'customer/product/:productId', component: ViewProductDetailComponent},
  {path: 'customer/wishlist', component: ViewWishlistComponent}

];
