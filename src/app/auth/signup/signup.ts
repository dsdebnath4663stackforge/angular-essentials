import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: 'signup.html'
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
    // 👉 যদি ফর্মটি অবৈধ হয় (required ফিল্ড ফাঁকা বা ভুল ইনপুট), কিছুই করো না
    if (this.form.invalid) return;

    // 🔄 সাবমিট শুরু — লোডিং স্টেট true করে দিচ্ছি (বাটন ডিজেবল থাকবে)
    this.loading = true;

    // ❌ আগের কোনো এরর থাকলে তা রিসেট করে দিচ্ছি
    this.error = '';

    // 🚀 AuthService-এর signup() মেথডে ফর্মের ভ্যালু পাঠাচ্ছি (API কল হবে)
    this.authService.signup(this.form.value as any).subscribe({
      // ✅ যদি সার্ভার থেকে সফল রেসপন্স আসে
      next: () => {
        // ⏹️ লোডিং বন্ধ করো
        this.loading = false;
        // 🏠 সফল হলে ইউজারকে ড্যাশবোর্ডে রিডাইরেক্ট করো
        this.router.navigate(['/dashboard']);
      },
      // ❌ যদি কোনো এরর হয় (যেমন সার্ভার বন্ধ বা ব্যাড রেসপন্স)
      error: (err) => {
        // ⏹️ লোডিং বন্ধ করো
        this.loading = false;
        // ⚠️ এরর মেসেজ সেট করো যাতে ইউজার দেখতে পায়
        this.error = 'Signup failed. Check mock server.';
        // 🪵 কনসোলে এরর প্রিন্ট করো (ডিবাগ করার জন্য)
        console.error(err);
      }
    });
  }

}
