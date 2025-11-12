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
import { AppointmentSchedulingComponent } from './hms/appointment-scheduling/appointment-scheduling';
import { OpdComponent } from './hms/opd/opd';
import { IpdComponent } from './hms/ipd/ipd';
import { EmergencyComponent } from './hms/emergency/emergency';
import { EmrComponent } from './hms/emr/emr';
import { CpoeComponent } from './hms/cpoe/cpoe';
import { PharmacyComponent } from './hms/pharmacy/pharmacy';
import { LaboratoryComponent } from './hms/laboratory/laboratory';
import { RadiologyComponent } from './hms/radiology/radiology';
import { OtManagementComponent } from './hms/ot-management/ot-management';
import { Billing } from './hms/billing/billing';
import { Inventory } from './hms/inventory/inventory';
import { FeedbackCrm } from './hms/feedback-crm/feedback-crm';
import { MasterConfig } from './hms/master-config/master-config';
import { Notifications } from './hms/notifications/notifications';
import { PatientPortal } from './hms/patient-portal/patient-portal';
import { QueueManagement } from './hms/queue-management/queue-management';
import { RbacAudit } from './hms/rbac-audit/rbac-audit';
import { ReportsAnalytics } from './hms/reports-analytics/reports-analytics';


export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },

    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent },

    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
    { path: 'admin', component: AdminComponent, canActivate: [AuthGuard, RoleGuard], data: { role: 'admin' } },

    // 🔹 Core Clinical & Patient Flow
    {
        path: 'patient-registration',
        component: PatientRegistrationComponent,
        canActivate: [AuthGuard, RoleGuard],
        data: { role: ['receptionist', 'admin'] }
    },
    {
        path: 'appointments',
        component: AppointmentSchedulingComponent,
        canActivate: [AuthGuard, RoleGuard],
        data: { role: ['receptionist', 'doctor', 'admin'] }
    },
    {
        path: 'opd',
        component: OpdComponent,
        canActivate: [AuthGuard, RoleGuard],
        data: { role: ['doctor', 'nurse', 'admin'] }
    },
    {
        path: 'ipd',
        component: IpdComponent,
        canActivate: [AuthGuard, RoleGuard],
        data: { role: ['doctor', 'nurse', 'admin'] }
    },
    {
        path: 'emergency',
        component: EmergencyComponent,
        canActivate: [AuthGuard, RoleGuard],
        data: { role: ['doctor', 'nurse', 'receptionist', 'admin'] }
    },
    {
        path: 'emr',
        component: EmrComponent,
        canActivate: [AuthGuard, RoleGuard],
        data: { role: ['doctor', 'nurse', 'admin'] }
    },
    {
        path: 'cpoe',
        component: CpoeComponent,
        canActivate: [AuthGuard, RoleGuard],
        data: { role: ['doctor', 'nurse', 'labtech', 'pharmacist', 'admin'] }
    },

    // 🔹 Diagnostics & Pharmacy
    {
        path: 'pharmacy',
        component: PharmacyComponent,
        canActivate: [AuthGuard, RoleGuard],
        data: { role: ['pharmacist', 'admin'] }
    },
    {
        path: 'laboratory',
        component: LaboratoryComponent,
        canActivate: [AuthGuard, RoleGuard],
        data: { role: ['labtech', 'doctor', 'admin'] }
    },
    {
        path: 'radiology',
        component: RadiologyComponent,
        canActivate: [AuthGuard, RoleGuard],
        data: { role: ['labtech', 'doctor', 'admin'] }
    },
    {
        path: 'ot-management',
        component: OtManagementComponent,
        canActivate: [AuthGuard, RoleGuard],
        data: { role: ['doctor', 'nurse', 'admin'] }
    },

    // 🔹 Billing & Commercial
    {
        path: 'billing',
        component: Billing ,
        canActivate: [AuthGuard, RoleGuard],
        data: { role: ['billing', 'admin'] }
    },

    // 🔹 Inventory & Admin
    {
        path: 'inventory',
        component: Inventory,
        canActivate: [AuthGuard, RoleGuard],
        data: { role: ['admin'] }
    },
    {
        path: 'master-config',
        component: MasterConfig,
        canActivate: [AuthGuard, RoleGuard],
        data: { role: ['admin'] }
    },
    {
        path: 'rbac-audit',
        component: RbacAudit,
        canActivate: [AuthGuard, RoleGuard],
        data: { role: ['admin'] }
    },

    // 🔹 Patient-facing & Experience
    {
        path: 'patient-portal',
        component: PatientPortal,
        canActivate: [AuthGuard, RoleGuard],
        data: { role: ['patient', 'admin'] }
    },
    {
        path: 'queue-management',
        component: QueueManagement,
        canActivate: [AuthGuard, RoleGuard],
        data: { role: ['receptionist', 'admin'] }
    },
    {
        path: 'notifications',
        component: Notifications,
        canActivate: [AuthGuard, RoleGuard],
        data: { role: ['admin'] }
    },
    {
        path: 'feedback-crm',
        component: FeedbackCrm,
        canActivate: [AuthGuard, RoleGuard],
        data: { role: ['admin'] }
    },
    {
        path: 'reports-analytics',
        component: ReportsAnalytics,
        canActivate: [AuthGuard, RoleGuard],
        data: { role: ['admin'] }
    },

    { path: 'unauthorized', component: UnauthorizedComponent },

    { path: '**', redirectTo: 'login' }
];
