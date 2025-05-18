import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ProcedimientoMantenimiento } from '../../models/procedimiento-mantenimiento.model';

@Injectable({
  providedIn: 'root'
})
export class ProcedimientoMantenimientoService {

  constructor(private http: HttpClient) { }

  list(): Observable<ProcedimientoMantenimiento[]> {
    return this.http.get<ProcedimientoMantenimiento[]>(`${environment.url_ms_cinema}/procedimientomantenimiento`);
  }

  view(id: number): Observable<ProcedimientoMantenimiento> {
    return this.http.get<ProcedimientoMantenimiento>(`${environment.url_ms_cinema}/procedimientomantenimiento/${id}`);
  }

  create(newProcedimientoMantenimiento: ProcedimientoMantenimiento): Observable<ProcedimientoMantenimiento> {
    return this.http.post<ProcedimientoMantenimiento>(`${environment.url_ms_cinema}/procedimientomantenimiento`, newProcedimientoMantenimiento);
  }

  update(theProcedimientoMantenimiento: ProcedimientoMantenimiento): Observable<ProcedimientoMantenimiento> {
    return this.http.put<ProcedimientoMantenimiento>(`${environment.url_ms_cinema}/procedimientomantenimiento/${theProcedimientoMantenimiento.id}`, theProcedimientoMantenimiento);
  }

  delete(id: number) {
    return this.http.delete<ProcedimientoMantenimiento>(`${environment.url_ms_cinema}/procedimientomantenimiento/${id}`);
  }
}