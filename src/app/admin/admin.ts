import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="min-h-screen bg-slate-100 flex items-center justify-center">
      <div class="bg-white rounded-2xl shadow-lg p-8 max-w-xl w-full">
        <h2 class="text-2xl font-semibold text-slate-800 mb-4">
          Admin Panel
        </h2>
        <p class="text-slate-600">
          Only users with <span class="font-semibold text-blue-600">admin</span> role can view this page.
        </p>
      </div>
    </div>
  `
})
export class AdminComponent { }
