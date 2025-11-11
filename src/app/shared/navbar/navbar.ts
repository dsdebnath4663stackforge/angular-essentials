import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <nav class="bg-blue-600 text-white shadow-md">
      <div class="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <a routerLink="/" class="text-xl font-semibold tracking-wide">MediHub Demo</a>
        <div class="flex space-x-4">
          <a routerLink="/login" class="hover:text-gray-200">Login</a>
          <a routerLink="/signup" class="hover:text-gray-200">Signup</a>
          <a routerLink="/dashboard" class="hover:text-gray-200">Dashboard</a>
                    <a routerLink="/patient-registration" class="hover:text-gray-200">patient-registration</a>
          <a routerLink="/admin" class="hover:text-gray-200">Admin</a>
          <button *ngIf="authService.isLoggedIn()" 
                  (click)="logout()" 
                  class="bg-red-500 hover:bg-red-600 px-3 py-1 rounded">
            Logout
          </button>
        </div>
      </div>
    </nav>
  `
})
export class
  NavbarComponent {
  constructor(public authService: AuthService) { }

  logout(): void {
    this.authService.logout();
    window.location.href = '/login';
  }
}
