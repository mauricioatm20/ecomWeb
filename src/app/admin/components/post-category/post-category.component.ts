import {Component, OnInit} from '@angular/core';
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {MatSnackBar, MatSnackBarModule} from "@angular/material/snack-bar";
import {AdminService} from "../../service/admin.service";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-post-category',
  standalone: true,
  imports: [
    MatFormField,
    MatLabel,
    MatInput,
    MatError,
    MatButton,
    MatSnackBarModule,
    CommonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './post-category.component.html',
  styleUrl: './post-category.component.scss'
})
export class PostCategoryComponent implements OnInit{

   categoryForm!: FormGroup;

   constructor(
     private fb: FormBuilder,
     private router: Router,
     private snackBar: MatSnackBar,
     private adminService: AdminService,
   ) {}

  ngOnInit(): void {
     this.categoryForm = this.fb.group({
       name: [null, [Validators.required]],
       description: [null, [Validators.required]],
     })
  }

  addCategory(): void {
     if (this.categoryForm.valid) {
       this.adminService.addCategory(this.categoryForm.value).subscribe((res) =>{
         if(res.id != null){
           this.snackBar.open('Category Posted Successfully','Close',{
             duration: 5000,
           });
           this.router.navigateByUrl('/admin/dashboard');
         }else{
           this.snackBar.open(res.message,'Close',{
             duration: 5000,
             panelClass: 'error-snackbar'
           });
         }
       })
     }else {
       this.categoryForm.markAsTouched()
     }
  }
}
