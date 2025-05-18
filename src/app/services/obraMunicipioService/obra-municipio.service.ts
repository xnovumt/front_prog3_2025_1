import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ObraMunicipio } from '../../models/obra-municipio.model';

@Injectable({
  providedIn: 'root'
})
export class ObraMunicipioService {

  constructor(private http: HttpClient) { }

  list(): Observable<ObraMunicipio[]> {
    return this.http.get<ObraMunicipio[]>(`${environment.url_ms_cinema}/obramunicipio`);
  }

  view(id: number): Observable<ObraMunicipio> {
    return this.http.get<ObraMunicipio>(`${environment.url_ms_cinema}/obramunicipio/${id}`);
  }

  create(newObraMunicipio: ObraMunicipio): Observable<ObraMunicipio> {
    return this.http.post<ObraMunicipio>(`${environment.url_ms_cinema}/obramunicipio`, newObraMunicipio);
  }

  update(theObraMunicipio: ObraMunicipio): Observable<ObraMunicipio> {
    return this.http.put<ObraMunicipio>(`${environment.url_ms_cinema}/obramunicipio/${theObraMunicipio.id}`, theObraMunicipio);
  }

  delete(id: number) {
    return this.http.delete<ObraMunicipio>(`${environment.url_ms_cinema}/obramunicipio/${id}`);
  }
}