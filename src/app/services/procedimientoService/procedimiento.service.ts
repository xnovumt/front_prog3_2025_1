import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Procedimiento } from '../../models/procedimiento.model';

@Injectable({
  providedIn: 'root'
})
export class ProcedimientoService {

  constructor(private http: HttpClient) { }

  list(): Observable<Procedimiento[]> {
    return this.http.get<Procedimiento[]>(`${environment.url_ms_cinema}/procedimiento`);
  }

  view(id: number): Observable<Procedimiento> {
    return this.http.get<Procedimiento>(`${environment.url_ms_cinema}/procedimiento/${id}`);
  }

  create(newProcedimiento: Procedimiento): Observable<Procedimiento> {
    return this.http.post<Procedimiento>(`${environment.url_ms_cinema}/procedimiento`, newProcedimiento);
  }

  update(theProcedimiento: Procedimiento): Observable<Procedimiento> {
    return this.http.put<Procedimiento>(`${environment.url_ms_cinema}/procedimiento/${theProcedimiento.id}`, theProcedimiento);
  }

  delete(id: number) {
    return this.http.delete<Procedimiento>(`${environment.url_ms_cinema}/procedimiento/${id}`);
  }
}