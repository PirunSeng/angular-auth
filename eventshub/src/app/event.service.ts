import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private _baseUrl = 'http://localhost:3000/api/';

  constructor(
    private http: HttpClient
  ) { }

  getEvents() {
    return this.http.get<any>(`${this._baseUrl}events`);
  }

  getSpecialEvents() {
    return this.http.get<any>(`${this._baseUrl}special`);
  }
}
