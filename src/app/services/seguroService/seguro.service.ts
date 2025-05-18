import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Seguro } from '../../models/seguro.model';

@Injectable({
  providedIn: 'root'
})
export class SeguroService {

  constructor(private http: HttpClient) { }

  list(): Observable<Seguro[]> {
    return this.http.get<Seguro[]>(`${environment.url_ms_cinema}/seguro`);
  }

  view(id: number): Observable<Seguro> {
    return this.http.get<Seguro>(`${environment.url_ms_cinema}/seguro/${id}`);
  }

  create(newSeguro: Seguro): Observable<Seguro> {
    return this.http.post<Seguro>(`${environment.url_ms_cinema}/seguro`, newSeguro);
  }

  update(theSeguro: Seguro): Observable<Seguro> {
    return this.http.put<Seguro>(`${environment.url_ms_cinema}/seguro/${theSeguro.id}`, theSeguro);
  }

  delete(id: number) {
    return this.http.delete<Seguro>(`${environment.url_ms_cinema}/seguro/${id}`);
  }
}