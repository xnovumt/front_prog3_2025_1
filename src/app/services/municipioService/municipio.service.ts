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

    list(): Observable<{ data: Municipio[] }> {
        return this.http.get<{ data: Municipio[] }>(`${environment.url_ms_cinema}/municipios`);
    }

    view(id: string): Observable<Municipio> {
        return this.http.get<Municipio>(`${environment.url_ms_cinema}/municipios/${id}`);
    }
}
