import { NgModule } from '@angular/core';

import {DemoAngularMaterialModule} from "./DemoAngularMaterialModule";
// @ts-ignore
import { AppRoutingModule } from './app-routing.module';
import {LoginComponent} from "./login/login.component";
import {BrowserModule} from "@angular/platform-browser";
import {SignupComponent} from "./signup/signup.component";
import {AppComponent} from "./app.component";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {provideHttpClient} from "@angular/common/http";
import {CommonModule} from "@angular/common";
import {MatSnackBarModule} from "@angular/material/snack-bar";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    DemoAngularMaterialModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    provideHttpClient(),
    MatSnackBarModule

  ],
  bootstrap: [AppComponent],
  providers: [provideHttpClient()]
})
export class AppModule { }
