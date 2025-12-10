import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

import { AuthenticationService } from '../services/authentication.service';

/**
 * NavbarComponent
 *
 * This component renders the global navigation bar for the
 * Travlr Getaways Admin SPA.
 *
 * Responsibilities:
 *  - Display navigation links (Trips, Login, Logout)
 *  - React to authentication state by showing Log In / Log Out
 *  - Trigger logout behavior and redirect to the home page
 *
 * All authentication logic is delegated to AuthenticationService,
 * which keeps this component focused on presentation and navigation.
 */
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'] // fixed: styleUrls (plural)
})
export class NavbarComponent implements OnInit {

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) { }

  ngOnInit(): void { }

  /**
   * Helper method used by the template to determine whether
   * the current user is logged in.
   */
  public isLoggedIn(): boolean {
    return this.authenticationService.isLoggedIn();
  }

  /**
   * Called when the user clicks "Log Out".
   * Clears the JWT from storage and redirects to the home page.
   */
  public onLogout(): void {
    this.authenticationService.logout();
    this.router.navigate(['']);
  }
}
