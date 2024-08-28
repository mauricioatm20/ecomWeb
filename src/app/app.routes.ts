import { Routes } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {SignupComponent} from "./signup/signup.component";
import {AdminComponent} from "./admin/admin.component";
import {DashboardComponent} from "./admin/components/dashboard/dashboard.component";
import {CustomerComponent} from "./customer/customer.component";
import {DashboardCComponent} from "./customer/components/dashboard-c/dashboard-c.component";


export const routes: Routes = [
  {path:"login",component: LoginComponent},
  {path:"signup",component: SignupComponent},
  {path: '', redirectTo: '/login', pathMatch: 'full' }, // Redirige a signup por defecto

  { path: 'dashboard', component: DashboardComponent } ,// Ruta hija de admin
  { path: 'dashboard-c', component: DashboardCComponent } // Ruta hija de customer
];
