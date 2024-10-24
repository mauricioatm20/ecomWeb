import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {AuthService} from "../service/auth/auth.service";
import {MatFormField, MatLabel, MatSuffix} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {MatCardModule} from "@angular/material/card";
import {CommonModule, NgIf} from "@angular/common";

@Component({
  selector: 'app-track-order',
  standalone: true,
  imports: [
    MatFormField,
    MatLabel,
    ReactiveFormsModule,
    MatInput,
    MatButton,
    MatSuffix,
    MatIcon,
    NgIf,
    CommonModule,
    MatCardModule

  ],
  templateUrl: './track-order.component.html',
  styleUrl: './track-order.component.scss'
})
export class TrackOrderComponent implements OnInit{

  searchOrderForm!: FormGroup;
  order: any;

  constructor(

  private fb: FormBuilder,
  private authService: AuthService,) {}

  ngOnInit(): void {
    this.searchOrderForm = this.fb.group({
      trackingId: [null,[Validators.required]]
    })
  }

  submitForm(){
    this.authService.getOrderByTrackingId(this.searchOrderForm.get('trackingId').value).subscribe(res =>{
      console.log(res);
      this.order = res;
    })
  }
}
