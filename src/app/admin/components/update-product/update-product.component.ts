import {Component, OnInit} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatInput} from "@angular/material/input";
import {MatOption} from "@angular/material/core";
import {MatSelect} from "@angular/material/select";
import {CommonModule, NgForOf, NgIf} from "@angular/common";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AdminService} from "../../service/admin.service";

@Component({
  selector: 'app-update-product',
  standalone: true,
    imports: [
        MatButton,
        MatError,
        MatFormField,
        MatIcon,
        MatInput,
        MatLabel,
        MatOption,
        MatSelect,
        NgForOf,
        NgIf,
        ReactiveFormsModule,
        RouterLink,
        CommonModule
    ],
  templateUrl: './update-product.component.html',
  styleUrl: './update-product.component.scss'
})
export class UpdateProductComponent implements OnInit{

  productId: number;

  productForm: FormGroup;
  listOfCategories: any=[];
  selectedFile: File | null;
  imagePreview: string | ArrayBuffer | null;

  existingImage: string | null = null;
  imgChanged = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
    private adminService: AdminService,
    private activatedroute: ActivatedRoute,
  ) {}

  onFileSelected(event:any){
    this.selectedFile = event.target.files[0];
    this.previewImage();
    this.imgChanged = true;

    this.existingImage = null;
  }

  previewImage(){
    const reader = new FileReader();
    reader.onload =()=>{
      this.imagePreview = reader.result;
    }
    reader.readAsDataURL(this.selectedFile);
  }

  ngOnInit(): void {

    this.productId = this.activatedroute.snapshot.params['productId'];

    this.productForm = this.fb.group({
      categoryId: [null, [Validators.required]],
      name: [null, [Validators.required]],
      price: [null, [Validators.required]],
      description: [null, [Validators.required]],
    });
    this.getAllCategories();
    this.getProductById();
  }
  getAllCategories(){
    this.adminService.getAllCategories().subscribe((res) =>{
      this.listOfCategories = res;
    })
  }

  getProductById(){
    this.adminService.getProductById(this.productId).subscribe(res=>{
      this.productForm.patchValue(res);
      this.existingImage = 'data:image/jpeg;base64,' + res.byteImg;
    })
  }
  updateProduct(): void{
    if(this.productForm.valid){
      const formData: FormData = new FormData();

      if(this.imgChanged && this.selectedFile){
        formData.append('img', this.selectedFile);
      }

      formData.append('img',this.selectedFile);
      formData.append('CategoryId', this.productForm.get('categoryId').value);
      formData.append('name', this.productForm.get('name').value);
      formData.append('description', this.productForm.get('description').value);
      formData.append('price', this.productForm.get('price').value);

      this.adminService.updateProduct(this.productId,formData).subscribe((res)=>{
        if(res.id != null){
          this.snackBar.open('Product update Successfully','Close',{
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

