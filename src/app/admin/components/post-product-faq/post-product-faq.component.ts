import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {AdminService} from "../../service/admin.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatError, MatFormField, MatFormFieldModule, MatLabel} from "@angular/material/form-field";
import {MatButton} from "@angular/material/button";
import {CommonModule} from "@angular/common";
import {MatInputModule} from "@angular/material/input";

@Component({
  selector: 'app-post-product-faq',
  standalone: true,
  imports: [

    MatLabel,
    MatError,
    ReactiveFormsModule,
    MatButton,
    CommonModule,
    ReactiveFormsModule,
    MatFormField,
    MatInputModule,
  ],
  templateUrl: './post-product-faq.component.html',
  styleUrl: './post-product-faq.component.scss'
})
export class PostProductFaqComponent implements OnInit{

  productId: number;  // Inicializamos sin asignación aquí
  FAQForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private adminService: AdminService,
    private activatedRoute: ActivatedRoute,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit(){
    // Accedemos al parámetro de ruta en ngOnInit, cuando ya está disponible
    this.productId = this.activatedRoute.snapshot.params['productId'];

    this.FAQForm = this.fb.group({
      question: [null, [Validators.required]],
      answer: [null, [Validators.required]],
    });
  }

  postFAQ() {
    this.adminService.postFAQ(this.productId, this.FAQForm.value).subscribe(res => {
      if (res.id != null) {
        this.snackBar.open("FAQ Posted Successfully!", 'Close', {
          duration: 5000
        });
        this.router.navigateByUrl('/dashboard');
      } else {
        this.snackBar.open("Something went wrong", 'Close', {
          duration: 5000,
          panelClass: 'error-snackbar'
        });
      }
    });
  }
}
