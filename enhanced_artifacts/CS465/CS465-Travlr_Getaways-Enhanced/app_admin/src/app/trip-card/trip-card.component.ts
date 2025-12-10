import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { Trip } from '../models/trip';
import { AuthenticationService } from '../services/authentication.service';
import { TripDataService } from '../services/trip-data.service';

/**
 * TripCardComponent
 *
 * This component displays a single trip in card form.
 * It:
 *  - Shows trip details
 *  - Allows admins to edit or delete the trip when logged in
 *
 * Editing and deleting use Angular routing and TripDataService.
 */
@Component({
  selector: 'app-trip-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './trip-card.component.html',
  styleUrls: ['./trip-card.component.css']
})
export class TripCardComponent implements OnInit {

  /**
   * The trip to be displayed.
   */
  @Input() trip!: Trip;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private tripDataService: TripDataService
  ) {}

  ngOnInit(): void {
    if (!this.trip) {
      console.warn('TripCardComponent initialized without a trip input.');
    }
  }

  /**
   * Used by the template to show/hide admin actions.
   */
  public isLoggedIn(): boolean {
    return this.authenticationService.isLoggedIn();
  }

  /**
   * Navigates to the Edit Trip screen for this trip.
   */
  public editTrip(trip: Trip): void {
    if (!trip || !trip.code) {
      console.error('editTrip called with invalid trip.');
      return;
    }

    this.router.navigate(['edit-trip'], {
      queryParams: { tripCode: trip.code }
    });
  }

  /**
   * Deletes the current trip after user confirmation.
   * On success, navigates to the home route, which triggers
   * TripListingComponent to reload the trip list.
   */
  public deleteTrip(trip: Trip): void {
    if (!trip || !trip.code) {
      console.error('deleteTrip called with invalid trip.');
      return;
    }

    const confirmed = window.confirm(
      `Are you sure you want to delete trip "${trip.name}" (${trip.code})?`
    );

    if (!confirmed) {
      return;
    }

    this.tripDataService.deleteTrip(trip.code).subscribe({
      next: () => {
        console.log(`Trip ${trip.code} deleted successfully.`);
        // Navigate to '' to trigger NavigationEnd,
        // which reloads the list in TripListingComponent.
        this.router.navigate(['']);
      },
      error: (err: any) => {
        console.error('Error deleting trip:', err);
        alert('An error occurred while deleting the trip.');
      }
    });
  }
}
