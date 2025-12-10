import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthenticationService } from './services/authentication.service';

/**
 * authGuard
 *
 * A simple route guard that restricts access to certain routes
 * unless the user is logged in with a valid JWT.
 *
 * Demonstrates:
 *  - Integration between routing and authentication layers
 *  - Clean separation of privilege checks from UI logic
 */
export const authGuard: CanActivateFn = () => {
    const authService = inject(AuthenticationService);
    const router = inject(Router);

    if (authService.isLoggedIn()) {
        return true;
    }

    // Not logged in → redirect to login page
    router.navigate(['login']);
    return false;
};
