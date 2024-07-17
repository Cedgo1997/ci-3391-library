import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  URL = environment.base_url;
  constructor(private http: HttpClient) { }

  createUser(data: any): Observable<{ message: string }> {
    return this.http.post<{message: string}>(`${this.URL}/usuarios_crear`, data)
  }

  getAllUsers(): Observable<string> {
    return this.http.get<string>(`${this.URL}/usuarios`);
  }
}
