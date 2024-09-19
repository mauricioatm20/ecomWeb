import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {provideHttpClient} from "@angular/common/http";
import {DemoAngularMaterialModule} from "../DemoAngularMaterialModule";
import {CustomerComponent} from "./customer.component";
import {DashboardCComponent} from "./components/dashboard-c/dashboard-c.component";


@NgModule({
  declarations: [
    CustomerComponent,
    DashboardCComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    provideHttpClient(),
    DemoAngularMaterialModule
  ]
})
export class CustomerModule { }
