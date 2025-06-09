import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Municipio } from 'src/app/models/municipio.model';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class MunicipioService {
    constructor(private http: HttpClient) { }

    // GET para listar municipios
    list(): Observable<{ data: Municipio[] }> {
        return this.http.get<{ data: Municipio[] }>(`${environment.url_ms_cinema}/municipios`);
    }

    // POST para sincronizar municipios (no envía nada en el body)
    sincronizar(): Observable<any> {
        return this.http.post(`${environment.url_ms_cinema}/municipios/sincronizar`, {});
    }

    view(id: string): Observable<Municipio> {
        return this.http.get<Municipio>(`${environment.url_ms_cinema}/municipios/${id}`);
    }
}