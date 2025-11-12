// ✅ Import required Angular core and router modules
import { Injectable } from '@angular/core';
import {
    CanActivate,             // Interface used to control route access
    ActivatedRouteSnapshot,  // Represents the route being accessed
    RouterStateSnapshot,     // Represents the full router state
    Router                   // Used to navigate programmatically
} from '@angular/router';
import { AuthService } from './auth.service'; // Our custom service that manages login state

// ✅ Marks this guard as injectable and available throughout the app
@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

    // 🔹 Inject AuthService (to check login status) and Router (to redirect)
    constructor(
        private authService: AuthService,
        private router: Router
    ) { }

    // 🔹 This method runs automatically before a route is activated
    canActivate(
        route: ActivatedRouteSnapshot,   // Info about the route being accessed
        state: RouterStateSnapshot       // Info about the current URL
    ): boolean {

        // ✅ Step 1: Check if user is logged in using AuthService
        if (this.authService.isLoggedIn()) {
            // 🟢 If logged in, allow access to the route
            return true;
        }

        // 🔴 Step 2: If not logged in, clear any stored data and redirect to login page
        this.authService.logout();

        // 🧭 Redirect user to the login page and remember the page they tried to access
        // Example: trying to visit /dashboard will redirect to /login?returnUrl=/dashboard
        this.router.navigate(['/login'], {
            queryParams: { returnUrl: state.url }
        });

        // 🚫 Block access to the route
        return false;
    }
}
