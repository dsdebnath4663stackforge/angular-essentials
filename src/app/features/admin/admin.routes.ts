import { Routes } from '@angular/router';
import { AdminComponent } from '../../admin/admin';
import { Inventory } from '../../hms/inventory/inventory';
import { MasterConfig } from '../../hms/master-config/master-config';
import { RbacAudit } from '../../hms/rbac-audit/rbac-audit';
import { ReportsAnalytics } from '../../hms/reports-analytics/reports-analytics';
import { Billing } from '../../hms/billing/billing'; // billing is heavy but keep in admin bundle

export const ADMIN_ROUTES: Routes = [
    { path: '', component: AdminComponent },                // /admin
    { path: 'billing', component: Billing, data: { role: ['billing', 'admin'] } },
    { path: 'inventory', component: Inventory, data: { role: ['admin'] } },
    { path: 'master-config', component: MasterConfig, data: { role: ['admin'] } },
    { path: 'rbac-audit', component: RbacAudit, data: { role: ['admin'] } },
    { path: 'reports-analytics', component: ReportsAnalytics, data: { role: ['admin'] } }
];
