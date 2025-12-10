// src/app/app.routes.ts

/**
 * Application Routes
 *
 * This file defines the available navigation paths for the admin SPA.
 * Each route maps a URL segment to a standalone Angular component.
 *
 * Design principles demonstrated:
 *  - Clear separation of concerns between routing and components
 *  - Enforcement of authentication for protected views
 *  - Use of Angular standalone components for simplicity and modularity
 */

import { Routes } from '@angular/router';

// Standalone components
import { AddTripComponent } from './add-trip/add-trip.component';
import { EditTripComponent } from './edit-trip/edit-trip.component';
import { TripListingComponent } from './trip-listing/trip-listing.component';
import { LoginComponent } from './login/login.component';

// Optional enhancement: Guard to block unauthorized users
import { authGuard } from './auth.guard';   // You will create this next

export const routes: Routes = [

    /**
     * Trip Listing (Default Home Page)
     * Displays a list of all trips retrieved from the API.
     */
    { path: '', component: TripListingComponent, pathMatch: 'full' },

    /**
     * Login Page
     * Allows administrators to authenticate and receive a JWT.
     */
    { path: 'login', component: LoginComponent },

    /**
     * Add Trip Page (Protected)
     * Only authenticated admins may access this screen.
     */
    {
        path: 'add-trip',
        component: AddTripComponent,
        canActivate: [authGuard]      // Protects route
    },

    /**
     * Edit Trip Page (Protected)
     * Activated when the admin chooses to modify an existing trip.
     */
    {
        path: 'edit-trip',
        component: EditTripComponent,
        canActivate: [authGuard]      // Protects route
    },

    /**
     * Fallback Route
     * Redirects unrecognized paths back to the trip listing.
     */
    { path: '**', redirectTo: '' }
];
