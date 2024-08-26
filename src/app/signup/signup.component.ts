import {Component, OnInit} from '@angular/core';
import {MatCard, MatCardContent, MatCardTitle} from "@angular/material/card";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatError,MatFormFieldModule, MatSuffix} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {CommonModule} from "@angular/common";
import {AuthService} from "../service/auth/auth.service";
import {HttpClient} from "@angular/common/http";

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
    CommonModule,
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',

})
export class SignupComponent  implements OnInit{
  signupForm!: FormGroup;
  hidePassword = true;

  constructor(
    private httpClient: HttpClient, // Inyecta HttpClient aquí
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      name: [null, [Validators.required]],
      email: [null, [Validators.required]],
      password: [null, [Validators.required]],
      confirmPassword: [null, [Validators.required]],
    });
  }

  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }

  onSubmit(): void {
    if (this.signupForm.invalid) {
      return;
    }

    const password = this.signupForm.get('password')?.value;
    const confirmPassword = this.signupForm.get('confirmPassword')?.value;

    if (password !== confirmPassword) {
      this.snackBar.open('Passwords do not match!', 'Close', {
        duration: 5000,
        panelClass: 'alert-danger'
      });
      return;
    }

    this.authService.register(this.signupForm.value).subscribe({
      next: (response) => {
        this.snackBar.open('Sign up successful!', 'Close', {
          duration: 5000,
        });
        this.router.navigate(['/login']);
      },
      error: (err) => {
        this.snackBar.open('Failed to sign up. Please try again', 'Close', {
          duration: 5000,
          panelClass: 'error-snackbar'
        });
      }
    });
  }
}
