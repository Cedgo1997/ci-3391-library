import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReportsService {
  constructor() {}
  URL = environment.base_url;
  private http = inject(HttpClient);

  reporBestDonors(): Observable<any> {
    return this.http.get<any>(`${this.URL}/consultar_personas_que_mas_donan_libros`);
  }

  reporBestBooks(): Observable<any> {
    return this.http.get<any>(`${this.URL}/consultar_libros_mas_vendidos`);
  }

  reportMostBorrowedBooks(): Observable<any> {
    return this.http.get<any>(`${this.URL}/generar_reporte_libros_mas_prestados`);
  }

  reportBestLibrarians(): Observable<any> {
    return this.http.get<any>(`${this.URL}/consultar_bibliotecarios_que_organizan_mas_eventos`);
  }

  reportBesBuyers(): Observable<any> {
    return this.http.get<any>(`${this.URL}/consultar_mejores_compradores`);
  }
}
