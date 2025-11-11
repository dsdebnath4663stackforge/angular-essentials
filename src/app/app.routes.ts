import { Routes } from '@angular/router';
// import { LoginComponent } from './auth/login/login.component';
// import { SignupComponent } from './auth/signup/signup.component';
// import { DashboardComponent } from './dashboard/dashboard.component';
// import { AdminComponent } from './admin/admin.component';
// import { UnauthorizedComponent } from './pages/unauthorized/unauthorized.component';
import { AuthGuard } from './auth/auth.guard';
import { RoleGuard } from './auth/role.guard';
import { LoginComponent } from './auth/login/login';
import { DashboardComponent } from './dashboard/dashboard';
import { SignupComponent } from './auth/signup/signup';
import { UnauthorizedComponent } from './pages/unauthorized/unauthorized';
import { AdminComponent } from './admin/admin';
import { PatientRegistrationComponent } from './hms/patient-registration/patient-registration';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },

    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent },

    {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [AuthGuard]
    },

    {
        path: 'admin',
        component: AdminComponent,
        canActivate: [AuthGuard, RoleGuard],
        data: { role: 'admin' }
    },

    // 🔹 Core Clinical & Patient Flow
    {
        path: 'patient-registration',
        component: PatientRegistrationComponent,
        canActivate: [AuthGuard, RoleGuard],
        data: { role: ['receptionist', 'admin'] }
    },

    { path: 'unauthorized', component: UnauthorizedComponent },

    { path: '**', redirectTo: 'login' },






];
