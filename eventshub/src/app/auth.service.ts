import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _baseUrl = 'http://localhost:3000/api/';

  constructor(
    private http: HttpClient,
    private _router: Router
  ) { }

  register(userData) {
    return this.http.post<any>(
      `${this._baseUrl}register`, userData
    );
  }

  login(userData) {
    return this.http.post<any>(
      `${this._baseUrl}login`, userData
    );
  }

  logout() {
    localStorage.removeItem('eventPubToken');
    this._router.navigate(['/events']);
  }

  isLoggedIn() {
    // return localStorage.getItem('eventPubToken'); // return token
    return !!localStorage.getItem('eventPubToken'); // return boolean
  }

  getToken() {
    return localStorage.getItem('eventPubToken');
  }
}
