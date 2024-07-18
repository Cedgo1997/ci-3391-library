import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private http = inject(HttpClient);
  URL = environment.base_url;

  getBookCategories(): Observable<string[]> {
    return this.http.get<string[]>(`${this.URL}/consultar_categorias_libros`);
  }
}
