// app_admin/src/app/services/authentication.service.ts

import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { BROWSER_STORAGE } from '../storage';
import { User } from '../models/user';
import { AuthResponse } from '../models/auth-response';
import { TripDataService } from './trip-data.service';

/**
 * AuthenticationService
 *
 * This service is responsible for:
 *  - Managing the JSON Web Token (JWT) in browser storage
 *  - Answering questions like "is the user logged in?"
 *  - Exposing login and registration methods to components
 *
 * It delegates the actual HTTP calls to TripDataService,
 * which keeps API communication and authentication logic
 * separated in a clean, testable way.
 */
@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {

  /**
   * Holds the most recent authentication response so that components
   * can access details if needed (such as the raw token).
   */
  authResp: AuthResponse = new AuthResponse();

  constructor(
    @Inject(BROWSER_STORAGE) private storage: Storage,
    private tripDataService: TripDataService
  ) { }

  /**
   * Returns the JWT stored in browser storage.
   * The key "travlr-token" is used consistently across the app.
   */
  public getToken(): string {
    const token = this.storage.getItem('travlr-token');
    // Always return a string to avoid null/undefined issues
    return token ? token : '';
  }

  /**
   * Saves the JWT to browser storage.
   * This is called after a successful login or registration.
   */
  public saveToken(token: string): void {
    this.storage.setItem('travlr-token', token);
  }

  /**
   * Logs the user out by removing the JWT from storage.
   * Components can call this when the user clicks a "Logout" button.
   */
  public logout(): void {
    this.storage.removeItem('travlr-token');
  }

  /**
   * Checks whether the user is currently logged in.
   * A user is considered logged in if:
   *  - There is a token in storage, and
   *  - The token has not expired yet (exp > now)
   */
  public isLoggedIn(): boolean {
    const token: string = this.getToken();

    if (!token) {
      return false;
    }

    try {
      // JWT structure: header.payload.signature
      const payload = JSON.parse(atob(token.split('.')[1]));
      // exp is in seconds, Date.now() is in milliseconds
      return payload.exp > Date.now() / 1000;
    } catch (err) {
      // If token is malformed or cannot be decoded, treat as logged out
      console.error('Error decoding JWT:', err);
      return false;
    }
  }

  /**
   * Returns the current user (email and name) decoded from the token.
   * This method should only be called after checking isLoggedIn().
   */
  public getCurrentUser(): User {
    const token: string = this.getToken();

    if (!token) {
      return { email: '', name: '' } as User;
    }

    try {
      const { email, name } = JSON.parse(atob(token.split('.')[1]));
      return { email, name } as User;
    } catch (err) {
      console.error('Error decoding JWT in getCurrentUser:', err);
      return { email: '', name: '' } as User;
    }
  }

  /**
   * Login method that delegates the HTTP call to TripDataService.
   *
   * This method:
   *  - Sends the credentials to the /api/login endpoint
   *  - Saves the returned token into storage on success
   *  - Returns the AuthResponse as an Observable so components
   *    can react (for example, navigate after successful login)
   */
  public login(user: User, passwd: string): Observable<AuthResponse> {
    return this.tripDataService.login(user, passwd).pipe(
      tap((value: AuthResponse) => {
        if (value && value.token) {
          this.authResp = value;
          this.saveToken(value.token);
        }
      })
    );
  }

  /**
   * Register method that delegates the HTTP call to TripDataService.
   *
   * This method:
   *  - Sends the registration data to /api/register
   *  - Saves the returned token into storage on success
   *  - Returns the AuthResponse as an Observable so components
   *    can react (for example, show a message or redirect)
   *
   * Note: The API is designed so that a new user is automatically
   * logged in after registration, which is why the token is
   * handled the same way as in login().
   */
  public register(user: User, passwd: string): Observable<AuthResponse> {
    return this.tripDataService.register(user, passwd).pipe(
      tap((value: AuthResponse) => {
        if (value && value.token) {
          this.authResp = value;
          this.saveToken(value.token);
        }
      })
    );
  }
}
