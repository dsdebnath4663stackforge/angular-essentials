Great pick! Here’s a solid **mid-level real-world scenario** for Task 24 (Lazy Loading Feature Modules), using your HMS app:

# Scenario: Role-Based “Clinical Workbench” vs “Admin Console” with On-Demand Loading

### Context

In a real hospital, most users are **clinical** (doctors, nurses, reception) who never touch **admin** screens (tariffs, packages, inventory, audit). Eager-loading everything slows down first paint. We split the app so **Clinicians only download clinical chunks**, while **Admins** load heavy admin tools only when they navigate there.

### What to lazy-load

* `features/dashboard` → quick patient cards, today’s appointments, vitals snapshot. (Everyone)
* `features/clinical` → OPD/IPD/EMR/CPOE/Emergency modules bundled together (Doctor/Nurse/Receptionist)
* `features/diagnostics` → Lab/Radiology/Pharmacy bundle (LabTech/Pharmacist/Doctor read-only)
* `features/admin` → Billing, Inventory, Master Config, RBAC/Audit, Reports (Admin/Billing)

### Why this is mid-level

* You’ll handle **route-level lazy loading**, **preloading strategy** (e.g., QuickLink or custom) and **canLoad guards** so unauthorized roles don’t even fetch the chunk.
* You’ll balance **bundle boundaries**: clinical heavy features are grouped, but admin is isolated to avoid penalizing common users.

---

## Commands (Angular CLI)

```bash
# Core lazy modules
ng g module features/dashboard --route dashboard --module app.routes
ng g module features/clinical --route clinical --module app.routes
ng g module features/diagnostics --route diagnostics --module app.routes
ng g module features/admin --route admin --module app.routes
```

Inside each feature module, generate pages as **standalone components** or declare them in the module—your choice. Example:

```bash
ng g component features/clinical/pages/opd --standalone --flat
ng g component features/clinical/pages/ipd --standalone --flat
ng g component features/clinical/pages/emr --standalone --flat
ng g component features/clinical/pages/cpoe --standalone --flat

ng g component features/admin/pages/billing --standalone --flat
ng g component features/admin/pages/inventory --standalone --flat
ng g component features/admin/pages/reports --standalone --flat
ng g component features/admin/pages/rbac-audit --standalone --flat
```

---

## Route Setup (app.routes.ts)

```ts
import { Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { RoleGuard } from './auth/role.guard';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'dashboard' },

  // Eager-loaded public routes like login/signup remain outside

  // Lazy: Dashboard (all logged-in users)
  {
    path: 'dashboard',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./features/dashboard/dashboard.routes').then(m => m.DASHBOARD_ROUTES)
  },

  // Lazy: Clinical bundle (Doctor/Nurse/Receptionist/Admin)
  {
    path: 'clinical',
    canActivate: [AuthGuard, RoleGuard],
    canLoad: [AuthGuard, RoleGuard],          // prevent chunk download if not allowed
    data: { role: ['doctor', 'nurse', 'receptionist', 'admin'] },
    loadChildren: () =>
      import('./features/clinical/clinical.routes').then(m => m.CLINICAL_ROUTES)
  },

  // Lazy: Diagnostics bundle (LabTech/Pharmacist/Doctor/Admin)
  {
    path: 'diagnostics',
    canActivate: [AuthGuard, RoleGuard],
    canLoad: [AuthGuard, RoleGuard],
    data: { role: ['labtech', 'pharmacist', 'doctor', 'admin'] },
    loadChildren: () =>
      import('./features/diagnostics/diagnostics.routes').then(m => m.DIAGNOSTICS_ROUTES)
  },

  // Lazy: Admin bundle (Admin, Billing for /admin/billing)
  {
    path: 'admin',
    canActivate: [AuthGuard, RoleGuard],
    canLoad: [AuthGuard, RoleGuard],
    data: { role: ['admin'] },
    loadChildren: () =>
      import('./features/admin/admin.routes').then(m => m.ADMIN_ROUTES)
  },

  { path: '**', redirectTo: 'dashboard' }
];
```

Each feature defines its own child routes:

### features/clinical/clinical.routes.ts

```ts
import { Routes } from '@angular/router';
import { OpdComponent } from './pages/opd/opd.component';
import { IpdComponent } from './pages/ipd/ipd.component';
import { EmrComponent } from './pages/emr/emr.component';
import { CpoeComponent } from './pages/cpoe/cpoe.component';

export const CLINICAL_ROUTES: Routes = [
  { path: '', redirectTo: 'opd', pathMatch: 'full' },
  { path: 'opd', component: OpdComponent, data: { role: ['doctor', 'nurse', 'admin'] } },
  { path: 'ipd', component: IpdComponent, data: { role: ['doctor', 'nurse', 'admin'] } },
  { path: 'emr', component: EmrComponent, data: { role: ['doctor', 'nurse', 'admin'] } },
  { path: 'cpoe', component: CpoeComponent, data: { role: ['doctor', 'nurse', 'labtech', 'pharmacist', 'admin'] } }
];
```

### features/admin/admin.routes.ts

```ts
import { Routes } from '@angular/router';
import { BillingComponent } from './pages/billing/billing.component';
import { InventoryComponent } from './pages/inventory/inventory.component';
import { ReportsComponent } from './pages/reports/reports.component';
import { RbacAuditComponent } from './pages/rbac-audit/rbac-audit.component';

export const ADMIN_ROUTES: Routes = [
  { path: '', redirectTo: 'reports', pathMatch: 'full' },
  { path: 'billing', component: BillingComponent, data: { role: ['billing', 'admin'] } },
  { path: 'inventory', component: InventoryComponent, data: { role: ['admin'] } },
  { path: 'reports', component: ReportsComponent, data: { role: ['admin'] } },
  { path: 'rbac-audit', component: RbacAuditComponent, data: { role: ['admin'] } }
];
```

*(Similar for dashboard/diagnostics.)*

---

## Bonus: Smart Preloading (mid-level)

Create a **role-aware preloading strategy** that preloads *only* the bundle the user is likely to hit next:

* Doctor: preload `/clinical` + `/diagnostics`
* Billing: preload `/admin`
* Admin: preload all
* Others: preload nothing (mobile, slow networks)

This keeps first paint fast, while hiding latency on first navigation.

---

## How to Verify It Works

1. Build with stats:

```bash
ng build --configuration production
```

Check `dist/` → you should see separate JS chunks for `clinical`, `diagnostics`, `admin`, `dashboard`.

2. Network tab:

* Login as **doctor** → open `/dashboard`. Only `dashboard` chunk loads.
* Navigate to `/clinical/opd` → the `clinical` chunk loads **on demand**.
* Try `/admin/reports` as **doctor**:

  * `canLoad` blocks → **no admin chunk download**; redirected to `/unauthorized`.

3. Lighthouse:

* Compare TTI/First Contentful Paint with and without lazy loading.

---

## One-liner “mid-level” use case

“Split the HMS into **role-scoped lazy bundles** (Clinical, Diagnostics, Admin). Use `canLoad` to prevent unauthorized chunk downloads, and a **role-aware preloading strategy** so doctors preload clinical/diagnostics, billing preloads admin, and everyone else loads nothing upfront. This mirrors real hospital usage patterns and measurably improves first load and route transition times.”
