import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { TripDataService } from '../services/trip-data.service';
import { Trip } from '../models/trip';

/**
 * EditTripComponent
 *
 * This component allows administrators to edit an existing trip.
 * It:
 *  - Reads the tripCode from the route query parameters
 *  - Loads the current trip data from the Travlr API
 *  - Uses a reactive form for validation and editing
 *  - Sends updates back to the server via TripDataService
 *
 * This design demonstrates a clear separation between:
 *  - Routing / navigation (Router, ActivatedRoute)
 *  - Data access (TripDataService)
 *  - Presentation and validation (this component + template)
 */
@Component({
  selector: 'app-edit-trip',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-trip.component.html',
  styleUrls: ['./edit-trip.component.css'],
})
export class EditTripComponent implements OnInit {
  /**
   * Reactive form backing the edit view. Initialized in ngOnInit.
   */
  public editForm!: FormGroup;

  /**
   * Holds the trip currently being edited.
   */
  public trip!: Trip;

  /**
   * Tracks whether the form has been submitted.
   */
  public submitted = false;

  /**
   * Status message displayed to the administrator.
   */
  public message: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private tripDataService: TripDataService
  ) {}

  /**
   * Lifecycle hook used to:
   *  - Read the tripCode from the query parameters
   *  - Initialize the reactive form
   *  - Load the trip details from the API
   */
  ngOnInit(): void {
    // Retrieve tripCode from query parameters instead of localStorage
    const tripCode = this.route.snapshot.queryParamMap.get('tripCode');

    if (!tripCode) {
      alert('No trip code was provided. Returning to the trip list.');
      this.router.navigate(['']);
      return;
    }

    console.log('EditTripComponent::ngOnInit - tripCode:', tripCode);

    // Initialize the form with validators
    this.editForm = this.formBuilder.group({
      code: [tripCode, Validators.required],
      name: ['', Validators.required],
      length: ['', Validators.required],
      start: ['', Validators.required],
      resort: ['', Validators.required],
      perPerson: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      image: ['', Validators.required],
      description: ['', Validators.required],
    });

    // Load the trip data from the API
    this.tripDataService.getTrip(tripCode).subscribe({
      next: (trip: Trip) => {
        this.trip = trip;

        if (!trip) {
          this.message = 'No trip was retrieved.';
          console.warn(this.message);
          return;
        }

        this.message = `Trip ${tripCode} retrieved.`;
        console.log(this.message);

        // Patch values into the form.
        // Convert start date into yyyy-MM-dd format for the date input.
        this.editForm.patchValue({
          code: trip.code,
          name: trip.name,
          length: trip.length,
          start: this.toDateInputValue(trip.start),
          resort: trip.resort,
          perPerson: trip.perPerson,
          image: trip.image,
          description: trip.description,
        });
      },
      error: (error: any) => {
        console.error('Error retrieving trip:', error);
        this.message =
          'There was a problem retrieving the trip from the server.';
      },
    });
  }

  /**
   * Convenience getter that exposes form controls to the template.
   * Allows cleaner HTML such as f.name.invalid, f.code.touched, etc.
   */
  get f() {
    return this.editForm.controls;
  }

  /**
   * Called when the user submits the "Save" button.
   * Validates the form and sends the update to the API via TripDataService.
   */
  public onSubmit(): void {
    this.submitted = true;

    if (this.editForm.invalid) {
      console.warn('EditTripComponent: Form is invalid.');
      return;
    }

    // Map form values into a Trip object
    const updatedTrip: Trip = {
      _id: this.trip._id,
      code: this.f['code'].value,
      name: this.f['name'].value,
      length: this.f['length'].value,
      start: new Date(this.f['start'].value),
      resort: this.f['resort'].value,
      perPerson: Number(this.f['perPerson'].value),
      image: this.f['image'].value,
      description: this.f['description'].value,
    };

    this.tripDataService.updateTrip(updatedTrip).subscribe({
      next: (trip: Trip) => {
        console.log('Trip updated:', trip);
        this.router.navigate(['']);
      },
      error: (error: any) => {
        console.error('Error updating trip:', error);
        alert('An error occurred while updating the trip.');
      },
    });
  }

  /**
   * Helper method to convert a Date (or date string) into
   * the yyyy-MM-dd format expected by HTML date input controls.
   */
  private toDateInputValue(date: string | Date): string {
    const d = new Date(date);
    // Ensure we always produce yyyy-MM-dd
    return d.toISOString().substring(0, 10);
  }
}
