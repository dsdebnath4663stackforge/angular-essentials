import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

interface LoginRequest {
    email: string;
    password: string;
}

interface SignupRequest {
    name: string;
    email: string;
    password: string;
}

interface AuthResponse {
    token: string; // mock JWT
}


export interface Profile {
    message: string;
    user: {
        email: string;
        iat: number;
        exp: number;
        role?: string; // optional, if backend sends
    };
}



@Injectable({ providedIn: 'root' })
export class AuthService {

    // Point this to your mock backend (json-server / mock API / local Node app)
    private readonly apiBase = 'http://localhost:3000';
    private readonly tokenKey = 'access_token';

    constructor(private http: HttpClient) { }

    login(payload: LoginRequest): Observable<AuthResponse> {
        return this.http.post<AuthResponse>(`${this.apiBase}/login`, payload).pipe(
            tap(res => {
                if (res?.token) {
                    localStorage.setItem(this.tokenKey, res.token);
                }
            })
        );
    }

    signup(payload: SignupRequest): Observable<AuthResponse> {
        return this.http.post<AuthResponse>(`${this.apiBase}/signup`, payload).pipe(
            tap(res => {
                // optional: auto login on signup
                if (res?.token) {
                    localStorage.setItem(this.tokenKey, res.token);
                }
            })
        );
    }
    getProfile(): Observable<Profile> {
        return this.http.get<Profile>(`${this.apiBase}/profile`);
        // Authorization header will be added by interceptor
    }

    getToken(): string | null {
        return localStorage.getItem(this.tokenKey);
    }


    // ✅ Safely decode JWT
    private decodeToken(token: string): any | null {
        try {
            const payload = token.split('.')[1];
            if (!payload) return null;
            return JSON.parse(atob(payload));
        } catch (e) {
            console.error('Invalid token payload', e);
            return null;
        }
    }
    // ✅ Check exp
    private isTokenExpired(token: string): boolean {
        const payload = this.decodeToken(token);
        if (!payload || !payload.exp) return true;
        const now = Math.floor(Date.now() / 1000);
        return payload.exp < now;
    }


    isLoggedIn(): boolean {
        const token = this.getToken();
        if (!token) return false;
        if (this.isTokenExpired(token)) {
            this.logout();
            return false;
        }
        return true;
    }
    // ✅ Extract role for RoleGuard
    getRole(): string | null {
        const token = this.getToken();
        if (!token) return null;
        const payload = this.decodeToken(token);
        // support multiple shapes
        return (
            payload?.role ||
            payload?.user?.role ||
            null
        );
    }

    logout(): void {
        localStorage.removeItem(this.tokenKey);
    }
}
