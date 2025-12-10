import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthenticationService } from '../services/authentication.service';
import { User } from '../models/user';

/**
 * LoginComponent
 *
 * This component is responsible for:
 *  - Collecting credentials from the administrator
 *  - Logging in an existing user
 *  - Registering a new user when requested
 *
 * It delegates authentication logic and token management to
 * AuthenticationService and focuses on form handling and navigation.
 */
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  /**
   * Holds any validation or login/register error messages that
   * should be displayed to the user.
   */
  public formError: string = '';

  /**
   * Tracks whether the form has been submitted.
   */
  public submitted = false;

  /**
   * Two-way bound to the login/registration form fields.
   */
  public credentials = {
    name: '',
    email: '',
    password: ''
  };

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit(): void { }

  /**
   * Called when the user clicks "Sign In".
   * Validates email + password and then attempts login.
   */
  public onLoginSubmit(): void {
    this.submitted = true;
    this.formError = '';

    if (!this.credentials.email || !this.credentials.password) {
      this.formError = 'Email and password are required. Please try again.';
      return;
    }

    this.doLogin();
  }

  /**
   * Called when the user clicks "Register".
   * Requires name, email, and password and then attempts registration.
   * On success, the API returns a token and the user is treated as logged in.
   */
  public onRegisterSubmit(): void {
    this.submitted = true;
    this.formError = '';

    if (!this.credentials.name || !this.credentials.email || !this.credentials.password) {
      this.formError = 'Name, email, and password are required to register.';
      return;
    }

    this.doRegister();
  }

  /**
   * Handles the login process via AuthenticationService.
   */
  private doLogin(): void {
    const user: User = {
      name: this.credentials.name,
      email: this.credentials.email
    };

    this.authenticationService.login(user, this.credentials.password).subscribe({
      next: () => {
        if (this.authenticationService.isLoggedIn()) {
          this.router.navigate(['']);
        } else {
          this.formError = 'Login failed. Please check your credentials.';
        }
      },
      error: (err: any) => {
        console.error('Login error:', err);
        this.formError = 'Unable to log in. Please check your email and password.';
      }
    });
  }

  /**
   * Handles the registration process via AuthenticationService.
   * On success, the new user is automatically logged in and redirected.
   */
  private doRegister(): void {
    const user: User = {
      name: this.credentials.name,
      email: this.credentials.email
    };

    this.authenticationService.register(user, this.credentials.password).subscribe({
      next: () => {
        if (this.authenticationService.isLoggedIn()) {
          this.router.navigate(['']);
        } else {
          this.formError = 'Registration failed. Please try again.';
        }
      },
      error: (err: any) => {
        console.error('Registration error:', err);
        this.formError = 'Unable to register. The email may already be in use.';
      }
    });
  }
}
