import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Bill } from '../models/bill.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BillService {
  private baseUrl = `${environment.gatewayUrl}/billing-service/bills`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Bill[]> {
    return this.http.get<Bill[]>(this.baseUrl);
  }

  getById(id: number): Observable<Bill> {
    return this.http.get<Bill>(`${this.baseUrl}/${id}`);
  }
}
