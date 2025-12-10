import { Injectable, Provider } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';

/**
 * JwtInterceptor
 *
 * This Angular HTTP interceptor automatically attaches the JSON Web Token (JWT)
 * to outgoing HTTP requests made by the admin client *except* for login and
 * registration calls.
 *
 * Benefits:
 *  - Components do NOT need to manually attach Authorization headers.
 *  - The interceptor centralizes token logic for cleaner separation of concerns.
 *  - API calls requiring authentication seamlessly include the JWT.
 *
 * This is a key enhancement supporting software engineering best practices
 * for CS-499 because it demonstrates modularity, reusability, and robustness.
 */
@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(
    private authenticationService: AuthenticationService
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    /**
     * Identify whether this request is meant for:
     *  - /api/login
     *  - /api/register
     *
     * These endpoints must NOT include Authorization headers because the server
     * expects credentials in the body, not a token.
     */
    const isAuthAPI =
      request.url.includes('/login') ||
      request.url.includes('/register');

    /**
     * For all other API calls:
     *  - Only modify the request when the user is logged in.
     *  - Attach the JWT as "Bearer <token>" to the Authorization header.
     */
    if (!isAuthAPI && this.authenticationService.isLoggedIn()) {
      const token = this.authenticationService.getToken();

      // Clone the request and add Authorization header
      const authReq = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });

      return next.handle(authReq);
    }

    // For login/register, or if the user is not logged in:
    return next.handle(request);
  }
}

/**
 * Provider definition that registers the interceptor globally
 * for all HTTP requests made through Angular's HttpClient.
 */
export const jwtInterceptorProvider: Provider = {
  provide: HTTP_INTERCEPTORS,
  useClass: JwtInterceptor,
  multi: true // allows multiple interceptors to co-exist
};
