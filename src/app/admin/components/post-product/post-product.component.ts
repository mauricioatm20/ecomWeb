import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatIcon} from "@angular/material/icon";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatOption, MatSelect} from "@angular/material/select";
import {MatInput, MatInputModule} from "@angular/material/input";
import {CommonModule, NgIf} from "@angular/common";
import {MatButton} from "@angular/material/button";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AdminService} from "../../service/admin.service";

@Component({
  selector: 'app-post-product',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatIcon,
    MatFormField,
    MatLabel,
    MatSelect,
    MatInputModule,
    MatOption,
    MatError,
    MatInput,
    NgIf,
    MatButton,
    CommonModule
  ],
  templateUrl: './post-product.component.html',
  styleUrl: './post-product.component.scss'
})
export class PostProductComponent implements OnInit{

  productForm: FormGroup;
  listOfCategories: any=[];
  selectedFile: File | null;
  imagePreview: string | ArrayBuffer | null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
    private adminService: AdminService,
  ) {}

  onFileSelected(event:any){
    this.selectedFile = event.target.files[0];
    this.previewImage();
  }

  previewImage(){
    const reader = new FileReader();
    reader.onload =()=>{
      this.imagePreview = reader.result;
    }
    reader.readAsDataURL(this.selectedFile);
  }

  ngOnInit(): void {
    this.productForm = this.fb.group({
      categoryId: [null, [Validators.required]],
      name: [null, [Validators.required]],
      price: [null, [Validators.required]],
      description: [null, [Validators.required]],
    });
    this.getAllCategories();
  }
  getAllCategories(){
    this.adminService.getAllCategories().subscribe((res) =>{
      this.listOfCategories = res;
    })
  }
  addProduct(): void{
    if(this.productForm.valid){
      const formData: FormData = new FormData();
      formData.append('img',this.selectedFile);
      formData.append('CategoryId', this.productForm.get('categoryId').value);
      formData.append('name', this.productForm.get('name').value);
      formData.append('description', this.productForm.get('description').value);
      formData.append('price', this.productForm.get('price').value);

      this.adminService.addProduct(formData).subscribe((res)=>{
        if(res.id != null){
          this.snackBar.open('Product Posted Successfully','Close',{
            duration: 5000,
          })
          this.router.navigateByUrl('/dashboard');
        }else {
          this.snackBar.open(res.message,'ERROR',{
            duration: 5000,
          })
        }
      })
    }else {
      for(const i in this.productForm.controls){
        this.productForm.controls[i].markAsDirty();
        this.productForm.controls[i].updateValueAndValidity();
      }
    }
  }
}
