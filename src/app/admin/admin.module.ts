import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {provideHttpClient} from "@angular/common/http";
import {DemoAngularMaterialModule} from "../DemoAngularMaterialModule";
import {AdminComponent} from "./admin.component";
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {PostCategoryComponent} from "./components/post-category/post-category.component";



@NgModule({
  declarations: [
    AdminComponent,
    DashboardComponent,
    PostCategoryComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    provideHttpClient(),
    DemoAngularMaterialModule
  ]
})
export class AdminModule { }
