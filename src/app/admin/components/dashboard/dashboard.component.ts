import {Component, OnInit} from '@angular/core';
import {AdminService} from "../../service/admin.service";
import {MatCard} from "@angular/material/card";
import {MatDivider} from "@angular/material/divider";
import {CommonModule} from "@angular/common";
import {MatButton} from "@angular/material/button";
import {RouterLink} from "@angular/router";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatFormField, MatLabel, MatSuffix} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatIcon} from "@angular/material/icon";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    MatCard,
    MatDivider,
    CommonModule,
    MatButton,
    RouterLink,
    MatFormField,
    MatLabel,
    MatInput,
    FormsModule,
    MatSuffix,
    MatIcon,
    ReactiveFormsModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit{

  products: any[]= [];
  searchProductForm!: FormGroup;

  constructor(
    private adminService: AdminService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,) {}

  ngOnInit() {
    this.getAllProducts();
    this.searchProductForm = this.fb.group({
      title: [null, [Validators.required]],
    })
  }

  getAllProducts() {
    this.products = [];
    this.adminService.getAllProducts().subscribe(res =>{
      res.forEach(element => {
        element.processedImg = 'data:image/jpeg;base64,' + element.byteImg;
        this.products.push(element);
      });
      console.log(this.products);
    })
  }

  submitForm(){
    this.products = [];
    const title = this.searchProductForm.get('title')!.value;
    this.adminService.getAllProductsByName(title).subscribe(res =>{
      res.forEach(element => {
        element.processedImg = 'data:image/jpeg;base64,' + element.byteImg;
        this.products.push(element);
      });
      console.log(this.products);
    })
  }

  deleteProduct(productId: any){
    this.adminService.deleteProduct(productId).subscribe(res =>{
      if(res==null){
        this.snackBar.open('Product Posted Successfully','Close',{
          duration: 5000,
        });
        this.getAllProducts();
      }else {
        this.snackBar.open(res.message,'Close',{
          duration: 5000,
          panelClass: 'error-snackbar'
        });
      }
    })
  }


}
