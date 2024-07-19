import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {

  http = inject(HttpClient);

  URL = environment.base_url;

  generateBookSale(data: any): Observable<any> {
    return this.http.post(`${this.URL}/vender_ejemplar`, data);
  }

  generateBookDonation(data: any): Observable<any> {
    return this.http.post(`${this.URL}/donar_ejemplar`, data);
  }

  generateBookLoan(data: any): Observable<any> {
    return this.http.post(`${this.URL}/realizar_prestamo`, data);
  }

  generateBookReturn(data: any): Observable<any> {
    return this.http.post(`${this.URL}/realizar_prestamo`, data);
  }
}
