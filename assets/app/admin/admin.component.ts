import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
    selector: 'app-auth',
    template: `
    <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
    <a class="dropdown-item" *ngIf="!isLoggedIn()" routerLink="/signin">Sign in</a>
    <a class="dropdown-item" *ngIf="!isLoggedIn()" routerLink="/signup">Sign up</a>
    <a class="dropdown-item" *ngIf="isLoggedIn()" routerLink="/signin">Logout</a>
    <a class="dropdown-item" *ngIf="isLoggedIn()" routerLink="/signup">Manage products</a>
  </div>
`
})
export class AuthComponent {
  constructor(private authService: AuthService) {}
  
      isLoggedIn() {
          return this.authService.isLoggedIn();
      }
}