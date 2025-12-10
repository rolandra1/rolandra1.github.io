import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';

import { TripCardComponent } from '../trip-card/trip-card.component';
import { TripDataService } from '../services/trip-data.service';
import { AuthenticationService } from '../services/authentication.service';
import { Trip } from '../models/trip';

/**
 * TripListingComponent
 *
 * This component is responsible for:
 *  - Displaying a list of trips returned from the Travlr API
 *  - Showing a message when no trips are available
 *  - Exposing UI actions such as "Add Trip" for authenticated admins
 *
 * It delegates all data access to TripDataService and all authentication
 * logic to AuthenticationService, which keeps responsibilities separated
 * and the component focused on presentation.
 */
@Component({
  selector: 'app-trip-listing',
  standalone: true,
  imports: [CommonModule, TripCardComponent],
  templateUrl: './trip-listing.component.html',
  styleUrls: ['./trip-listing.component.css']
  // NOTE: We do NOT provide TripDataService here because it is already
  // providedIn: 'root'. Using it here would create a new instance and break
  // the shared-service pattern.
})
export class TripListingComponent implements OnInit {

  /**
   * Holds the list of trips retrieved from the API.
   * This array is bound to the template and rendered using TripCardComponent.
   */
  public trips: Trip[] = [];

  /**
   * Holds a status message for the user, such as how many trips
   * were loaded or that none were found.
   */
  public message: string = '';

  constructor(
    private tripDataService: TripDataService,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    console.log('TripListingComponent constructor');

    /**
     * Subscribe to router events so that when navigation finishes,
     * we re-load the trip list.
     *
     * This allows the list to stay in sync when the admin adds or
     * edits a trip and then navigates back here.
     */
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.loadTrips();
      }
    });
  }

  /**
   * Called when the user clicks the "Add Trip" button.
   * Navigates to the add-trip route where a new trip can be created.
   */
  public addTrip(): void {
    this.router.navigate(['add-trip']);
  }

  /**
   * Convenience method for the template to check whether the
   * current user is logged in and allowed to manage trips.
   */
  public isLoggedIn(): boolean {
    return this.authenticationService.isLoggedIn();
  }

  /**
   * Retrieves the list of trips from the API via TripDataService.
   * Updates the trips array and a user-friendly status message.
   */
  private loadTrips(): void {
    this.tripDataService.getTrips()
      .subscribe({
        next: (value: Trip[]) => {
          this.trips = value;

          if (value.length > 0) {
            this.message = `There are ${value.length} trips available.`;
          } else {
            this.message = 'There were no trips retrieved from the database.';
          }

          console.log(this.message);
        },
        error: (error: any) => {
          console.error('Error loading trips:', error);
          this.message = 'There was a problem retrieving trips from the server.';
        }
      });
  }

  /**
   * Angular lifecycle hook called once the component is initialized.
   * We use it here to load the initial list of trips.
   */
  ngOnInit(): void {
    console.log('TripListingComponent ngOnInit');
    this.loadTrips();
  }
}
