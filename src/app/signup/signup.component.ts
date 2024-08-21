import { Component } from '@angular/core';
import {MatCard, MatCardContent, MatCardTitle} from "@angular/material/card";
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";

import {FormGroup} from "@angular/forms";
import {MatError,MatFormFieldModule, MatSuffix} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {AuthService} from "../service/auth.service";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    MatCard,
    MatCardTitle,
    MatCardContent,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInput,
    MatIconButton,
    MatSuffix,
    MatIcon,
    MatButton,
    MatError,
    CommonModule
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  signupForm!: FormGroup;
  hidePassword = true;

  constructor(private fb: FormBuilder,
              private snackBar: MatSnackBar,
              private authService: AuthService,
              private router: Router){

  }

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      name: [null, [Validators.required]],
      email: [null, [Validators.required]],
      password: [null, [Validators.required]],
      confirmPassword: [null, [Validators.required]],
    })
  }

  tooglePasswordVisibility(){
    this.hidePassword = !this.hidePassword;
  }

  onSubmit(): void {
    const password = this.signupForm.get('password')?.value;
    const confirmPassword = this.signupForm.get('confirmPassword')?.value;

    if (password != confirmPassword){
      this.snackBar.open('Passwords do not match!', 'Close', {duration:5000, panelClass: 'alert-danger'});
      return;
    }

    this.authService.register(this.signupForm.value).subscribe(
      (response)=>{
        this.snackBar.open('Sing up successful!', 'Close', {duration:5000 });
        this.router.navigate(['/login']);
      },
      (error)=>{
        this.snackBar.open('Failed to login. Please try again', 'Close', {duration:5000, panelClass: 'error-snackbar'});
      }
    )
  }

}
