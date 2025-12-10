import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule
} from '@angular/forms';
import { Router } from '@angular/router';

import { TripDataService } from '../services/trip-data.service';
import { Trip } from '../models/trip';

/**
 * AddTripComponent
 *
 * This component provides a reactive form used by administrators
 * to create new trips in the Travlr system. It focuses purely on
 * validation and user interaction while delegating all data
 * persistence to TripDataService.
 *
 * This demonstrates strong separation of concerns and supports
 * your RESTful enhancement by connecting directly to the
 * POST /api/trips endpoint via the service layer.
 */
@Component({
  selector: 'app-add-trip',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-trip.component.html',
  styleUrls: ['./add-trip.component.css'] // Correct plural: styleUrls
})
export class AddTripComponent implements OnInit {

  /**
   * Reactive form group that represents the structure of the trip object.
   * Validators ensure all fields meet basic requirements before submission.
   */
  public addForm!: FormGroup;

  /**
   * Tracks whether the form has been submitted. Useful for displaying
   * validation messages in the template.
   */
  public submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private tripService: TripDataService
  ) {}

  /**
   * Angular lifecycle hook.
   *
   * Initializes the reactive form and applies validators.
   * Using reactive forms supports maintainability and is
   * a strong engineering practice compared to template-only forms.
   */
  ngOnInit(): void {
    this.addForm = this.formBuilder.group({
      code: ['', Validators.required],
      name: ['', Validators.required],
      length: ['', Validators.required],
      start: ['', Validators.required],
      resort: ['', Validators.required],
      perPerson: ['', [Validators.required, Validators.pattern(/^\d+$/)]], // numeric
      image: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  /**
   * Convenience getter to expose form controls to the template.
   * This allows cleaner HTML bindings, such as f.code.errors.
   */
  get f() {
    return this.addForm.controls;
  }

  /**
   * Called when the user clicks "Add Trip".
   * Performs validation and then sends a Trip object to the API using
   * TripDataService.
   *
   * Delegating HTTP to the service improves testability and supports
   * your enhanced layered design:
   *
   * Component → Service → REST API → Database
   */
  public onSubmit(): void {
    this.submitted = true;

    // Stop if form is invalid
    if (this.addForm.invalid) {
      console.warn('AddTripComponent: Form is invalid.');
      return;
    }

    // Convert form values into a Trip object
    const newTrip: Trip = {
      _id: '',
      code: this.f['code'].value,
      name: this.f['name'].value,
      length: this.f['length'].value,
      start: new Date(this.f['start'].value), // ensure valid date
      resort: this.f['resort'].value,
      perPerson: Number(this.f['perPerson'].value),
      image: this.f['image'].value,
      description: this.f['description'].value
    };

    // Call the API through TripDataService
    this.tripService.addTrip(newTrip).subscribe({
      next: () => {
        // Navigate to home when successful
        this.router.navigate(['']);
      },
      error: (error: any) => {
        console.error('Error adding trip:', error);
        alert('An error occurred while adding the trip.');
      }
    });
  }
}
