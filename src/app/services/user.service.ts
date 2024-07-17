import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  URL = 'http://localhost:3000';
  constructor(private http: HttpClient) { }

  getAllUsers(): Observable<string> {
    return this.http.get<string>(`${this.URL}/usuarios`);
  }
}
