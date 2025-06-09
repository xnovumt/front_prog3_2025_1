import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Departamento } from 'src/app/models/departamento.model';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class DepartamentoService {
    constructor(private http: HttpClient) { }

    // GET para listar departamentos
    list(): Observable<{ data: Departamento[] }> {
        return this.http.get<{ data: Departamento[] }>(`${environment.url_ms_cinema}/departamentos`);
    }

    // POST para sincronizar departamentos
    sincronizar(): Observable<any> {
        return this.http.post(`${environment.url_ms_cinema}/departamentos/sincronizar`, {});
    }
}