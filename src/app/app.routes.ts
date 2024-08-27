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
  {path: '', redirectTo: '/signup', pathMatch: 'full' }, // Redirige a signup por defecto
  {path: '**', redirectTo: '/signup' }, // Redirige cualquier ruta no encontrada a signup

  {path:'',component:AdminComponent},
  {path:'dashboard', component: DashboardComponent},
  {path: '', component: CustomerComponent},
  {path:'dashboar', component: DashboardCComponent}
  //{path: 'customer', loadChildren:() => import ('./customer/customer.module').then((m) => m.CustomerModule)},
  //{path: 'admin', loadChildren: () => import('./admin/admin.module').then((m) => m.AdminModule)}
];
