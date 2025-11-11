// src/app/auth/role.guard.ts

import { Injectable } from '@angular/core';
import {
    CanActivate,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    Router,
    UrlTree
} from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class RoleGuard implements CanActivate {

    constructor(
        private authService: AuthService,
        private router: Router
    ) { }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): boolean | UrlTree {

        // 1. Must be authenticated (AuthGuard should usually run before this,
        //    but we keep a safe check here).
        if (!this.authService.isLoggedIn()) {
            return this.router.createUrlTree(['/login'], {
                queryParams: { returnUrl: state.url }
            });
        }

        // 2. Get required roles from route metadata.
        //    Examples:
        //    data: { role: 'doctor' }
        //    data: { role: ['receptionist', 'admin'] }
        const required = route.data['role'] as string | string[] | undefined;

        // If no role restriction configured → any logged-in user allowed.
        if (!required) {
            return true;
        }

        const allowedRoles = Array.isArray(required) ? required : [required];

        // 3. Get current user's role from token/storage.
        const userRole = this.authService.getRole(); // must return e.g. 'doctor', 'nurse', 'admin', etc.

        // If no role found → treat as unauthorized.
        if (!userRole) {
            return this.router.createUrlTree(['/unauthorized']);
        }

        // 4. Admin override:
        // Admin should match "All ✅" from your matrix.
        if (userRole === 'admin') {
            return true;
        }

        // 5. Strict match:
        // Only allow if the user's role is explicitly listed for this route.
        // This enforces exactly:
        // - Doctor: OPD, IPD, EMR, CPOE, Lab, Radiology, OT
        // - Nurse: OPD, IPD, EMR, CPOE, OT
        // - Receptionist: Registration, Appointments, Emergency, Queue
        // - LabTech: Lab, CPOE, Radiology
        // - Pharmacist: Pharmacy, CPOE
        // - Billing: Billing only
        // - Patient: Patient Portal only
        if (allowedRoles.includes(userRole)) {
            return true;
        }

        // 6. Fallback → user is logged in but not allowed for this module.
        return this.router.createUrlTree(['/unauthorized']);
    }
}