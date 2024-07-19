import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EventsService {
  constructor() {}
  URL = environment.base_url;
  private http = inject(HttpClient);

  createEvent(data: any): Observable<{ message: string }> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post<{ message: string }>(
      `${this.URL}/organizar_evento`,
      data,
      { headers }
    );
  }

  registerAssistant(data: any): Observable<{ message: string }> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post<{ message: string }>(
      `${this.URL}/registrar_asistencia_evento`,
      data,
      { headers }
    );
  }

  getAllEvents(filters?: any): Observable<any> {
    let params = new HttpParams();

    if (filters?.fecha_inicio) {
      params = params.set('fecha_inicio', filters.fecha_inicio);
    }
    if (filters?.fecha_final) {
      params = params.set('fecha_final', filters.fecha_final);
    }
    if (filters?.nombre_sucursal) {
      params = params.set('nombre_sucursal', filters.nombre_sucursal);
    }

    return this.http.get<any>(`${this.URL}/consultar_eventos`, { params });
  }

  getAllSucursales(): Observable<any> {
    return this.http.get<any>(`${this.URL}/consultar_sucursales`);
  }

  getAllLibrarians(): Observable<any> {
    return this.http.get<any>(`${this.URL}/usuarios_tipo/Bibliotecario`);
  }
}
