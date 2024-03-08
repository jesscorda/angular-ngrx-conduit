import { Injectable } from '@angular/core';

const LOCAL_STORAGE_KEY_NAME = 'token';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  setToken(token: string): void {
    localStorage.setItem(LOCAL_STORAGE_KEY_NAME, token);
  }

  getToken(): string | null {
    const token = localStorage.getItem(LOCAL_STORAGE_KEY_NAME);
    return token;
  }

  removeToken(): void {
    localStorage.removeItem(LOCAL_STORAGE_KEY_NAME);
  }
}
