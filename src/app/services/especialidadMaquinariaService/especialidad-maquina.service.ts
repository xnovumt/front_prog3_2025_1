import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { EspecialidadMaquinaria } from '../../models/especialidad-maquinaria.model';

@Injectable({
  providedIn: 'root'
})
export class EspecialidadMaquinariaService {

  constructor(private http: HttpClient) { }

  list(): Observable<EspecialidadMaquinaria[]> {
    return this.http.get<EspecialidadMaquinaria[]>(`${environment.url_ms_cinema}/machinery_speciality`);
  }

  view(id: number): Observable<EspecialidadMaquinaria> {
    return this.http.get<EspecialidadMaquinaria>(`${environment.url_ms_cinema}/machinery_speciality/${id}`);
  }

  create(newEspecialidadMaquinaria: EspecialidadMaquinaria): Observable<EspecialidadMaquinaria> {
    return this.http.post<EspecialidadMaquinaria>(`${environment.url_ms_cinema}/machinery_speciality`, newEspecialidadMaquinaria);
  }

  update(theEspecialidadMaquinaria: EspecialidadMaquinaria): Observable<EspecialidadMaquinaria> {
    return this.http.put<EspecialidadMaquinaria>(`${environment.url_ms_cinema}/machinery_speciality/${theEspecialidadMaquinaria.id}`, theEspecialidadMaquinaria);
  }

  delete(id: number) {
    return this.http.delete<EspecialidadMaquinaria>(`${environment.url_ms_cinema}/machinery_speciality/${id}`);
  }
}