import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Novedad } from '../../models/novedad.model';

@Injectable({
  providedIn: 'root'
})
export class NovedadService {

  constructor(private http: HttpClient) { }

  list(): Observable<Novedad[]> {
    return this.http.get<Novedad[]>(`${environment.url_ms_cinema}/novedad`);
  }

  view(id: number): Observable<Novedad> {
    return this.http.get<Novedad>(`${environment.url_ms_cinema}/novedad/${id}`);
  }

  create(newNovedad: Novedad): Observable<Novedad> {
    return this.http.post<Novedad>(`${environment.url_ms_cinema}/novedad`, newNovedad);
  }

  update(theNovedad: Novedad): Observable<Novedad> {
    return this.http.put<Novedad>(`${environment.url_ms_cinema}/novedad/${theNovedad.id}`, theNovedad);
  }

  delete(id: number) {
    return this.http.delete<Novedad>(`${environment.url_ms_cinema}/novedad/${id}`);
  }
}