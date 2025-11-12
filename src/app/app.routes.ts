// ✅ Import necessary Angular Router features
import { Routes } from '@angular/router';

// ✅ Import custom route guards
import { AuthGuard } from './auth/auth.guard';
import { RoleGuard } from './auth/role.guard';

// ✅ Import components for public routes
import { LoginComponent } from './auth/login/login';
import { SignupComponent } from './auth/signup/signup';
import { UnauthorizedComponent } from './pages/unauthorized/unauthorized';

// ✅ Define all application routes here
export const routes: Routes = [

    // 🔹 Default route → redirect to login page
    { path: '', redirectTo: 'login', pathMatch: 'full' },

    // 🔹 Public routes (no login required)
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent },

    // 🔹 Protected: Dashboard (only requires login)
    // Anyone who is authenticated can access this route
    {
        path: 'dashboard',
        canActivate: [AuthGuard], // check if user is logged in
        loadChildren: () =>
            import('./features/dashboard/dashboard.routes')
                .then(m => m.DASHBOARD_ROUTES)
    },

    // 🔹 Admin Module (only for users with role = admin)
    {
        path: 'admin',
        canActivate: [AuthGuard, RoleGuard], // check login + role
        data: { role: 'admin' }, // expected role for this route
        loadChildren: () =>
            import('./features/admin/admin.routes')
                .then(m => m.ADMIN_ROUTES)
    },

    // 🔹 Clinical Module (for Doctor/Nurse/Receptionist/Admin)
    {
        path: 'clinical',
        canActivate: [AuthGuard, RoleGuard],
        data: { role: ['doctor', 'nurse', 'receptionist', 'admin'] },
        loadChildren: () =>
            import('./features/clinical/clinical.routes')
                .then(m => m.CLINICAL_ROUTES)
    },

    // 🔹 Diagnostics Module (for LabTech/Pharmacist/Doctor/Admin)
    {
        path: 'diagnostics',
        canActivate: [AuthGuard, RoleGuard],
        data: { role: ['labtech', 'pharmacist', 'doctor', 'admin'] },
        loadChildren: () =>
            import('./features/diagnostics/diagnostics.routes')
                .then(m => m.DIAGNOSTICS_ROUTES)
    },

    // 🔹 Unauthorized access page
    // Shown when user tries to access restricted route
    { path: 'unauthorized', component: UnauthorizedComponent },

    // 🔹 Wildcard route → redirect unknown URLs to login
    { path: '**', redirectTo: 'login' }
];
