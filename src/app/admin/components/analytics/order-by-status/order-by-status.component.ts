import {Component, Input} from '@angular/core';
import {MatCard, MatCardAvatar, MatCardContent, MatCardHeader, MatCardTitle} from "@angular/material/card";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-order-by-status',
  standalone: true,
  imports: [
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardAvatar,
    MatCardContent,
    CommonModule
  ],
  templateUrl: './order-by-status.component.html',
  styleUrl: './order-by-status.component.scss'
})
export class OrderByStatusComponent {

  @Input()data:any
}
