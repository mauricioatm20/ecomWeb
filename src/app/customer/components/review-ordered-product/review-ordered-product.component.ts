import {Component, OnInit} from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";
import {CustomerService} from "../../services/customer.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import { UserStorageService } from '../../../service/storage/user-storage.service';
import {MatIcon} from "@angular/material/icon";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatOption, MatSelect} from "@angular/material/select";
import {MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-review-ordered-product',
  standalone: true,
  imports: [
    MatIcon,
    ReactiveFormsModule,
    MatFormField,
    MatLabel,
    MatSelect,
    MatOption,
    MatError,
    MatInput,
    MatButton,
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './review-ordered-product.component.html',
  styleUrl: './review-ordered-product.component.scss'
})
export class ReviewOrderedProductComponent implements OnInit{
  [x: string]: any;

  productId: number;
  reviewForm!: FormGroup;
  selectedFile: File | null;
  imagePreview: string | ArrayBuffer | null;

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private customerService: CustomerService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    ) {}

  ngOnInit(): void {
        this.productId = this.activatedRoute.snapshot.params["productId"];
        this.reviewForm = this.fb.group({
          rating:[null,[Validators.required]],
          description:[null,[Validators.required]],
        })
  }

  previewImage(){
    const reader = new FileReader();
    reader.onload = () =>{
      this.imagePreview = reader.result;
    }
    reader.readAsDataURL(this.selectedFile);
  }


  onFileSelected(event:any){
    this.selectedFile = event.target.files[0];
    this.previewImage();
  }

  submitForm(){
    const  formData: FormData = new FormData();

    formData.append('img',this.selectedFile);
    formData.append('productId', this.productId.toString());
    formData.append('userId', UserStorageService.getUserId().toString());
    formData.append('rating', this.reviewForm.get('rating').value);
    formData.append('description', this.reviewForm.get('description').value);


    // @ts-ignore
    this.customerService.giveReview(formData).subscribe(res =>{
      if (res.id != null){
        this.snackBar.open('Review Posted Successfully!', 'Close',{
          duration: 5000 });
        this.router.navigateByUrl('/customer/my_orders')
      }else{
        this.snackBar.open("Something went wrong", "ERROR",{
          duration: 5000 });
      }
    })
  }

}
