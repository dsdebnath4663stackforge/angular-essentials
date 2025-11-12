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
