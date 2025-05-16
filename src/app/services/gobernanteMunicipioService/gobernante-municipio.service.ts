import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { GobernanteMunicipio } from '../../models/gobernante-municipio.model';

@Injectable({
  providedIn: 'root'
})
export class GobernanteMunicipioService {

  constructor(private http: HttpClient) { }

  list(): Observable<GobernanteMunicipio[]> {
    return this.http.get<GobernanteMunicipio[]>(`${environment.url_ms_cinema}/municipalities_rulers`);
  }

  view(id: number): Observable<GobernanteMunicipio> {
    return this.http.get<GobernanteMunicipio>(`${environment.url_ms_cinema}/municipalities_rulers/${id}`);
  }

  create(newGobernanteMunicipio: GobernanteMunicipio): Observable<GobernanteMunicipio> {
    return this.http.post<GobernanteMunicipio>(`${environment.url_ms_cinema}/municipalities_rulers`, newGobernanteMunicipio);
  }

  update(theGobernanteMunicipio: GobernanteMunicipio): Observable<GobernanteMunicipio> {
    return this.http.put<GobernanteMunicipio>(`${environment.url_ms_cinema}/municipalities_rulers/${theGobernanteMunicipio.id}`, theGobernanteMunicipio);
  }

  delete(id: number) {
    return this.http.delete<GobernanteMunicipio>(`${environment.url_ms_cinema}/municipalities_rulers/${id}`);
  }
}