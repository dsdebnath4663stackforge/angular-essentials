import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
   <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-indigo-100 px-4">
      <div class="w-full max-w-md bg-white shadow-xl rounded-2xl p-8">
        <h2 class="text-3xl font-bold text-center text-indigo-700 mb-6">Create Account</h2>

        <form [formGroup]="form" (ngSubmit)="onSubmit()" class="space-y-5">
          <!-- Name -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input
              type="text"
              formControlName="name"
              placeholder="John Doe"
              class="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
            />
            <p *ngIf="form.get('name')?.invalid && form.get('name')?.touched" class="text-red-500 text-sm mt-1">
              Name is required
            </p>
          </div>

          <!-- Email -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <input
              type="email"
              formControlName="email"
              placeholder="you@example.com"
              class="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
            />
            <p *ngIf="form.get('email')?.invalid && form.get('email')?.touched" class="text-red-500 text-sm mt-1">
              Valid email required
            </p>
          </div>

          <!-- Password -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              formControlName="password"
              placeholder="••••••••"
              class="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
            />
            <p *ngIf="form.get('password')?.invalid && form.get('password')?.touched" class="text-red-500 text-sm mt-1">
              Password is required
            </p>
          </div>

          <!-- Submit -->
          <button
            type="submit"
            [disabled]="form.invalid || loading"
            class="w-full bg-indigo-600 text-white font-semibold py-2.5 rounded-lg hover:bg-indigo-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {{ loading ? 'Creating Account...' : 'Sign Up' }}
          </button>
        </form>

        <!-- Error -->
        <p *ngIf="error" class="text-center text-red-500 text-sm mt-4">{{ error }}</p>

        <!-- Link -->
        <p class="text-center text-sm text-gray-600 mt-6">
          Already have an account?
          <a routerLink="/login" class="text-indigo-600 font-medium hover:underline">Log In</a>
        </p>
      </div>
    </div>
  `
})
export class SignupComponent {

  form;
  loading = false;
  error = '';



  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {

    // ✅ initialize the form *after* fb is injected
    this.form = this.fb.group({
      name: ['John Doe', [Validators.required]],
      email: ['john@example.com', [Validators.required, Validators.email]],
      password: ['12345', [Validators.required]]
    });
  }

  onSubmit(): void {
    if (this.form.invalid) return;

    this.loading = true;
    this.error = '';

    this.authService.signup(this.form.value as any).subscribe({
      next: () => {
        this.loading = false;
        // Either go to dashboard directly or to login:
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        this.loading = false;
        this.error = 'Signup failed. Check mock server.';
        console.error(err);
      }
    });
  }
}
