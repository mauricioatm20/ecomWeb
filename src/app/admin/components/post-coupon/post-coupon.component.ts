import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatError, MatFormField, MatHint, MatLabel, MatPrefix} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatDatepicker, MatDatepickerModule, MatDatepickerToggle} from "@angular/material/datepicker";
import {MatButton} from "@angular/material/button";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AdminService} from "../../service/admin.service";
import {CommonModule} from "@angular/common";
import {MatNativeDateModule} from "@angular/material/core";

@Component({
  selector: 'app-post-coupon',
  standalone: true,
  imports: [
    FormsModule,
    MatFormField,
    MatLabel,
    MatInput,
    MatError,
    MatHint,
    MatPrefix,
    MatDatepickerToggle,
    MatDatepicker,
    MatButton,
    CommonModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,

  ],
  templateUrl: './post-coupon.component.html',
  styleUrl: './post-coupon.component.scss'
})
export class PostCouponComponent implements OnInit{

  couponForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
    private adminService: AdminService,) {}

  ngOnInit(){
    this.couponForm = this.fb.group({
      name: [null, [Validators.required]],
      code: [null, [Validators.required]],
      discount: [null, [Validators.required]],
      expirationDate: [null, [Validators.required]],
    })
  }

  addCoupon() {
    if(this.couponForm.valid){
      this.adminService.addCoupon(this.couponForm.value).subscribe(res =>{
        if(res.id != null){
          this.snackBar.open('Coupon Posted Successfully', 'Close', {
            duration: 5000
          });
          this.router.navigateByUrl('/dashboard');
        }else {
          this.snackBar.open(res.message,'Close',{
            duration: 5000,
            panelClass: 'error-snackbar'
          })
        }
      })
    }
  }
}
