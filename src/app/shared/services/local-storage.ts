import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorage {

  getItemJson<T>(key: string): T | null {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  }

  getItem(key: string): string | null {
    return localStorage.getItem(key);
  }

  setItemJson<T>(key: string, value: T): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  setItem(key: string, value: string): void {
    localStorage.setItem(key, value);
  }

  removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  clear(): void {
    localStorage.clear();
  }

  generateToken(): string {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  }

}
