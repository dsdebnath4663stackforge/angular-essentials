import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-patient-registration',
  imports: [CommonModule],
  template: `
    <div class="min-h-screen bg-slate-50 flex items-center justify-center">
      <div class="bg-white rounded-2xl shadow-md p-8 w-full max-w-3xl">
        <h1 class="text-2xl font-semibold text-slate-800 mb-2">
          🧑‍⚕️ Patient Registration & Master Index
        </h1>
        <p class="text-slate-500 text-sm mb-4">
          Accessible by: <span class="font-semibold">Receptionist, Admin</span>
        </p>
        <p class="text-xs text-slate-500">
          This is a protected route using <code>canActivate: [AuthGuard, RoleGuard]</code>.
          Try logging in as <span class="font-mono">receptionist@example.com / 12345</span> or
          <span class="font-mono">admin@example.com / 12345</span>.
        </p>
      </div>
    </div>
  `
})
export class PatientRegistrationComponent { }
