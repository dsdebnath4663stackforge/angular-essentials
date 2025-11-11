import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-unauthorized',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="min-h-screen flex items-center justify-center bg-slate-100">
      <div class="bg-white shadow-lg rounded-xl p-8 max-w-md text-center">
        <h1 class="text-3xl font-bold text-red-500 mb-4">
          Access Denied
        </h1>
        <p class="text-slate-600 mb-6">
          You don’t have permission to view this page.
        </p>
        <div class="flex justify-center space-x-4">
          <a routerLink="/dashboard"
             class="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition">
            Go to Dashboard
          </a>
          <a routerLink="/login"
             class="px-4 py-2 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50 transition">
            Login
          </a>
        </div>
      </div>
    </div>
  `
})
export class UnauthorizedComponent { }
