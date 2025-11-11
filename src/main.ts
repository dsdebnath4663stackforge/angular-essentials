import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { routes } from './app/app.routes';
 import { authInterceptor } from './app/auth/token-interceptor';
import { authErrorInterceptor } from './app/auth/auth-error.interceptor';
import { AppComponent } from './app/app';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([
        authInterceptor,       // attaches Authorization header
        authErrorInterceptor   // handles 401/403 globally
      ])
    )
  ]
}).catch(err => console.error(err));
