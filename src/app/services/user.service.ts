import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  URL = environment.base_url;
  private http = inject(HttpClient);

  createUser(data: any): Observable<{ message: string }> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post<{ message: string }>(`${this.URL}/usuarios_crear`, data, { headers, })
  }

  getAllUsers(): Observable<any> {
    return this.http.get<string>(`${this.URL}/usuarios`);
  }

  getUsersByText(text: string): Observable<any> {
    return this.http.get<string>(`${this.URL}/usuarios/${text}`);
  }

  getUsersByType(type: string): Observable<any> {
    return this.http.get(`${this.URL}/usuarios_tipo/${type}`);
  }
}
