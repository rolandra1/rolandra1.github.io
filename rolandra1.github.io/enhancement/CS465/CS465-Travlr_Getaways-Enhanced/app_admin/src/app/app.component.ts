// src/app/app.component.ts

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';

/**
 * AppComponent
 *
 * This is the root component of the Travlr Getaways Admin SPA.
 * It serves as the top-level container and is responsible for:
 *
 *  - Rendering the persistent navigation bar
 *  - Providing a router outlet for all routed views
 *  - Setting the global title for the admin application
 *
 * This component intentionally contains no business logic.
 * Its purpose is structural: it defines the shell of the SPA.
 *
 * This separation supports the enhanced software design approach
 * used throughout this project:
 *   AppComponent (shell) →
 *      Navbar (global UI) →
 *         Routed Components (functional screens)
 */
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {

  /**
   * Title displayed in the browser tab and available
   * for use throughout the SPA if desired.
   */
  protected title = 'Travlr Getaways Admin Portal';
}
