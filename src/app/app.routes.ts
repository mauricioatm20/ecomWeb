import { Routes } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {SignupComponent} from "./signup/signup.component";
import {DashboardComponent} from "./admin/components/dashboard/dashboard.component";
import {DashboardCComponent} from "./customer/components/dashboard-c/dashboard-c.component";
import {PostCategoryComponent} from "./admin/components/post-category/post-category.component";
import {PostProductComponent} from "./admin/components/post-product/post-product.component";


export const routes: Routes = [
  {path:"login",component: LoginComponent},
  {path:"signup",component: SignupComponent},
  {path: '', redirectTo: '/login', pathMatch: 'full' },// Redirige  por defecto

  {path: 'dashboard', component: DashboardComponent } ,// Ruta admin
  {path: 'dashboard-c', component: DashboardCComponent }, // Ruta customer
  {path: 'admin/category', component: PostCategoryComponent},
  {path: 'admin/product', component: PostProductComponent}
];
