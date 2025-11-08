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
    };
}



@Injectable({ providedIn: 'root' })
export class AuthService {

    // Point this to your mock backend (json-server / mock API / local Node app)
    private readonly apiBase = 'http://localhost:3000';

    constructor(private http: HttpClient) { }

    login(payload: LoginRequest): Observable<AuthResponse> {
        return this.http.post<AuthResponse>(`${this.apiBase}/login`, payload).pipe(
            tap(res => {
                if (res?.token) {
                    localStorage.setItem('access_token', res.token);
                }
            })
        );
    }

    signup(payload: SignupRequest): Observable<AuthResponse> {
        return this.http.post<AuthResponse>(`${this.apiBase}/signup`, payload).pipe(
            tap(res => {
                // optional: auto login on signup
                if (res?.token) {
                    localStorage.setItem('access_token', res.token);
                }
            })
        );
    }
    getProfile(): Observable<Profile> {
        return this.http.get<Profile>(`${this.apiBase}/profile`);
        // Authorization header will be added by interceptor
    }

    getToken(): string | null {
        return localStorage.getItem('access_token');
    }

    isLoggedIn(): boolean {
        return !!this.getToken();
    }

    logout(): void {
        localStorage.removeItem('access_token');
    }
}
