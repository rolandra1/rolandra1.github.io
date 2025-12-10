/**
 * storage.ts
 *
 * This file provides an Angular InjectionToken that allows services and components
 * to safely depend on browser-based localStorage **without tightly coupling**
 * them to the global window object.
 *
 * Benefits of this design:
 *  - Improves testability by allowing localStorage to be mocked
 *  - Supports dependency injection best practices
 *  - Prevents runtime errors in environments where localStorage is blocked
 */

import { InjectionToken } from '@angular/core';

/**
 * Safely obtain the browser's localStorage.
 * If localStorage is unavailable (private mode, server-side rendering, etc.),
 * fallback to an in-memory implementation so the application continues working.
 */
export function storageFactory(): Storage {
  try {
    return localStorage;
  } catch {
    console.warn('localStorage is not available; using in-memory fallback.');
    return new InMemoryStorage();
  }
}

/**
 * A very small in-memory localStorage fallback.
 * This satisfies the Storage interface and prevents runtime errors.
 */
class InMemoryStorage implements Storage {
  private store: Record<string, string> = {};

  get length(): number {
    return Object.keys(this.store).length;
  }

  clear(): void {
    this.store = {};
  }

  getItem(key: string): string | null {
    return this.store.hasOwnProperty(key) ? this.store[key] : null;
  }

  key(index: number): string | null {
    return Object.keys(this.store)[index] || null;
  }

  removeItem(key: string): void {
    delete this.store[key];
  }

  setItem(key: string, value: string): void {
    this.store[key] = value;
  }
}

/**
 * Injection token providing access to browser storage.
 * This allows Angular services (like AuthenticationService)
 * to inject a Storage provider using dependency injection.
 */
export const BROWSER_STORAGE = new InjectionToken<Storage>('Browser Storage', {
  providedIn: 'root',
  factory: storageFactory
});
