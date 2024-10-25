import {Component, OnInit} from '@angular/core';
import {Router, RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {MatToolbar} from "@angular/material/toolbar";
import {MatButton} from "@angular/material/button";
import {LoginComponent} from "./login/login.component";
import {SignupComponent} from "./signup/signup.component";
import {UserStorageService} from "./service/storage/user-storage.service";
import {CommonModule} from "@angular/common";
import {MatMenu} from "@angular/material/menu";



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, MatToolbar, MatButton, RouterLink, RouterLinkActive, LoginComponent, SignupComponent, MatMenu],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'ECommerceWeb';

  isCustomerLoggedIn: boolean = UserStorageService.isCustomerLoggedIn();
  isAdminLoggedIn: boolean = UserStorageService.isAdminLoggedIn();

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      this.isCustomerLoggedIn = UserStorageService.isCustomerLoggedIn();
      this.isAdminLoggedIn = UserStorageService.isAdminLoggedIn();
    })
  }

  logOut(): void {
    UserStorageService.signOut();
    this.router.navigateByUrl('login')
  }
}
