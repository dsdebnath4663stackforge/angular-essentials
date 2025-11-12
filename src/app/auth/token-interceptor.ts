// ✅ Import the new Angular 16+ functional HTTP interceptor feature
import { HttpInterceptorFn } from '@angular/common/http';

// ✅ Define a functional interceptor (no class needed)
export const authInterceptor: HttpInterceptorFn = (req, next) => {

  // 🔹 Step 1: Get JWT token from localStorage (if user is logged in)
  const token = localStorage.getItem('access_token');

  // 🔹 Step 2: If token exists, attach it to the request header
  if (token) {
    // 📦 clone() creates a copy of the request (since requests are immutable)
    const authReq = req.clone({
      setHeaders: {
        // 🧩 Add the Authorization header in "Bearer <token>" format
        Authorization: `Bearer ${token}`
      }
    });

    // 🔹 Step 3: Pass the modified request to the next interceptor or server
    return next(authReq);
  }

  // 🔹 Step 4: If no token, just send the request as it is (unauthenticated)
  return next(req);
};
