import { Routes } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {SignupComponent} from "./signup/signup.component";

export const routes: Routes = [
  {path:"login",component: LoginComponent},
  {path:"signup",component: SignupComponent},
  { path: '', redirectTo: '/signup', pathMatch: 'full' }, // Redirige a signup por defecto
  { path: '**', redirectTo: '/signup' } // Redirige cualquier ruta no encontrada a signup
  //{path: 'customer', loadChildren:() => import ('./customer/customer.module').then((m) => m.CustomerModule)},
  //{path: 'admin', loadChildren: () => import('./admin/admin.module').then((m) => m.AdminModule)}
];
