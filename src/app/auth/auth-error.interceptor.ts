import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { catchError, throwError } from 'rxjs';

export const authErrorInterceptor: HttpInterceptorFn = (req, next) => {
    const router = inject(Router);
    const authService = inject(AuthService);

    return next(req).pipe(
        catchError((error: any) => {
            if (error instanceof HttpErrorResponse) {
                if (error.status === 401) {
                    // Token invalid/expired on server side
                    authService.logout();
                    router.navigate(['/login'], {
                        queryParams: { session: 'expired' }
                    });
                } else if (error.status === 403) {
                    // Forbidden
                    router.navigate(['/unauthorized']);
                }
            }
            return throwError(() => error);
        })
    );
};
