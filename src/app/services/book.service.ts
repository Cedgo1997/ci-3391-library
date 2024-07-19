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

  getBooksByCategory(text: string, option?: string): Observable<any> {
    return this.http.post<any>(`${this.URL}/filtrar_libros_por_categoria`, {
      in_categoria: option,
      in_texto: text
    })
  }

  getBestSellerBooks(): Observable<any> {
    return this.http.get<any>(`${this.URL}/consultar_libros_mas_vendidos`);
  }

  addBook(data: any): Observable<any> {
    return this.http.post(`${this.URL}/registrar_nuevo_libro`, {
      ...data
    })
  }

  getBranch(): Observable<any> {
    return this.http.get(`${this.URL}/consultar_sucursales`);
  }

  getPublisher(): Observable<any> {
    return this.http.get(`${this.URL}/consultar_editoriales`);
  }

  getBookCopies(): Observable<any> {
    return this.http.get(`${this.URL}/consultar_ejemplares`);
  }


}
