import {Component, HostListener, OnInit} from '@angular/core';
import {Router, RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {MatToolbar} from "@angular/material/toolbar";
import {MatButton, MatIconButton} from "@angular/material/button";
import {LoginComponent} from "./login/login.component";
import {SignupComponent} from "./signup/signup.component";
import {UserStorageService} from "./service/storage/user-storage.service";
import {CommonModule} from "@angular/common";
import {MatMenu, MatMenuModule} from "@angular/material/menu";
import {MatIcon} from "@angular/material/icon";



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, MatToolbar, MatButton, RouterLink, RouterLinkActive, LoginComponent, SignupComponent, MatMenuModule, MatIcon, MatIconButton],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
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

  isCustomerLoggedInisAdminLoggedIn=[

  ];


  // Elementos del menú
  adminMenuItems = [
    { label: 'Dashboard', link: '/dashboard' },
    { label: 'Analytics', link: '/admin/analytics' },
    { label: 'Category', link: '/admin/category' },
    { label: 'Product', link: '/admin/product' },
    { label: 'Orders', link: '/admin/orders' },
    { label: 'Post Coupon', link: '/admin/post-coupon' },
    { label: 'Coupons', link: '/admin/coupons' },

  ];

  // Define el umbral para pantallas pequeñas
  private readonly SMALL_SCREEN_THRESHOLD = 1100;

  // Método para comprobar si la pantalla es pequeña
  isSmallScreen(): boolean {
    return window.innerWidth < this.SMALL_SCREEN_THRESHOLD;
  }

  // Listener para eventos de cambio de tamaño de la ventana
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    // Esto ayudará a actualizar la UI de acuerdo al tamaño
  }


  // Elementos del menú para clientes
  customerMenuItems = [
    { label: 'Dashboard', link: '/dashboard-c' },
    { label: 'Cart', link: '/customer/cart' },
    { label: 'Orders', link: '/customer/my_orders' },
    { label: 'Wishlist', link: '/customer/wishlist' },

  ];

  // Define el umbral para pantallas pequeñas
  private readonly SMALL_SCREEN_THRESHOLDC = 1000;

  // Método para comprobar si la pantalla es pequeña
  isSmallScreenC(): boolean {
    return window.innerWidth < this.SMALL_SCREEN_THRESHOLDC;
  }

  // Listener para eventos de cambio de tamaño de la ventana
  @HostListener('window:resize', ['$event'])
  onResizeC(event) {
    // Esto ayudará a actualizar la UI de acuerdo al tamaño
  }
}
