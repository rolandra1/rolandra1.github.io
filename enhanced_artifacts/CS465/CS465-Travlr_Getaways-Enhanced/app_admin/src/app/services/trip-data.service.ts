/* Programmer: Amos Roland
* Date: 2025-11-16
* Version: 7.0.0
* Description: This Angular service, TripDataService, facilitates secure
*              communication with the Travlr API. It performs full CRUD 
*              operations (Create, Read, Update, Delete) on trips and also
*              manages user authentication requests (login/register).
* Course: CS-499 - CS Capstone
* Course Origin: CS465 - Full Stack Development I
* School Name: Southern New Hampshire University
*/

import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Trip } from '../models/trip';
import { User } from '../models/user';
import { AuthResponse } from '../models/auth-response';

import { BROWSER_STORAGE } from '../storage';

/**
 * TripDataService
 *
 * This service is responsible for all HTTP communication
 * between the Angular admin client and the Travlr REST API.
 *
 * Responsibilities:
 *  - Retrieve all trips
 *  - Retrieve a specific trip
 *  - Create (add) a new trip
 *  - Update an existing trip
 *  - Delete a trip
 *  - Handle login and registration API calls
 *
 * Centralizing API operations in one service increases modularity,
 * supports maintainability, and aligns with Angular best practices.
 */
@Injectable({
  providedIn: 'root'
})
export class TripDataService {

  /**
   * Base URL of the Travlr API.
   * Update this value if the backend host or port changes.
   */
  private readonly baseUrl = 'http://localhost:3000/api';

  constructor(
    private http: HttpClient,
    @Inject(BROWSER_STORAGE) private storage: Storage
  ) { }

  /**
   * GET /api/trips
   * Returns all trips stored in the database.
   */
  getTrips(): Observable<Trip[]> {
    return this.http.get<Trip[]>(`${this.baseUrl}/trips`);
  }

  /**
   * GET /api/trips/:tripCode
   * Returns a single trip using its unique trip code.
   */
  getTrip(tripCode: string): Observable<Trip> {
    return this.http.get<Trip>(`${this.baseUrl}/trips/${tripCode}`);
  }

  /**
   * POST /api/trips
   * Adds a new trip to the database.
   * Protected route — requires JWT.
   */
  addTrip(trip: Trip): Observable<Trip> {
    const headers = this.buildAuthHeaders();
    return this.http.post<Trip>(`${this.baseUrl}/trips`, trip, { headers });
  }

  /**
   * PUT /api/trips/:tripCode
   * Updates an existing trip record.
   * Protected — requires JWT.
   */
  updateTrip(trip: Trip): Observable<Trip> {
    const headers = this.buildAuthHeaders();
    return this.http.put<Trip>(`${this.baseUrl}/trips/${trip.code}`, trip, { headers });
  }

  /**
   * DELETE /api/trips/:tripCode
   * Removes a trip from the database.
   * Protected — requires JWT.
   *
   * This method supports full CRUD enhancement and is required
   * for CS-499 Milestone Two to demonstrate complete REST functionality.
   */
  deleteTrip(tripCode: string): Observable<void> {
    const headers = this.buildAuthHeaders();
    return this.http.delete<void>(`${this.baseUrl}/trips/${tripCode}`, { headers });
  }

  /**
   * POST /api/login
   * Authenticates a user by email/password.
   * The API returns a JWT if successful.
   */
  login(user: User, passwd: string): Observable<AuthResponse> {
    return this.handleAuthAPICall('login', user, passwd);
  }

  /**
   * POST /api/register
   * Registers a new user account.
   * The API automatically logs the user in by returning a JWT.
   */
  register(user: User, passwd: string): Observable<AuthResponse> {
    return this.handleAuthAPICall('register', user, passwd);
  }

  /**
   * Helper method for login and register API calls.
   *
   * For login:
   *   - "name" is ignored by the API
   * For registration:
   *   - "name" is required
   *
   * Returns an Observable<AuthResponse> which contains a JWT token.
   */
  private handleAuthAPICall(endpoint: string, user: User, passwd: string): Observable<AuthResponse> {
    const formData = {
      name: user.name,
      email: user.email,
      password: passwd
    };

    return this.http.post<AuthResponse>(`${this.baseUrl}/${endpoint}`, formData);
  }

  /**
   * Builds the HTTP Authorization header using the stored JWT token.
   * The token is saved under "travlr-token" in browser localStorage.
   *
   * If no token is found, an empty Authorization header is sent.
   * The backend will respond with 401 Unauthorized when appropriate.
   */
  private buildAuthHeaders(): HttpHeaders {
    const token = this.storage.getItem('travlr-token') || '';

    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }
}
