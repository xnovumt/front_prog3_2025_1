import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, timer, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Servicio } from '../../models/servicio.model';
import { retryWhen, delayWhen, take, concatMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ServicioService {
  private maxRetries = 3;
  private retryDelay = 1000; // 1 segundo

  constructor(private http: HttpClient) { }

  list(): Observable<Servicio[]> {
    return this.http.get<Servicio[]>(`${environment.url_ms_cinema}/servicios`).pipe(
      retryWhen(errors =>
        errors.pipe(
          delayWhen((_, i) => timer((i + 1) * this.retryDelay)),
          take(this.maxRetries),
          concatMap(error => throwError(() => error))
        )
      )
    );
  }

  view(id: number): Observable<Servicio> {
    return this.http.get<Servicio>(`${environment.url_ms_cinema}/servicios/${id}`).pipe(
      retryWhen(errors =>
        errors.pipe(
          delayWhen((_, i) => timer((i + 1) * this.retryDelay)),
          take(this.maxRetries),
          concatMap(error => throwError(() => error))
        )
      )
    );
  }

  create(newService: Servicio): Observable<Servicio> {
    return this.http.post<Servicio>(`${environment.url_ms_cinema}/servicios`, newService).pipe(
      retryWhen(errors =>
        errors.pipe(
          delayWhen((_, i) => timer((i + 1) * this.retryDelay)),
          take(this.maxRetries),
          concatMap(error => throwError(() => error))
        )
      )
    );
  }

  update(theService: Servicio): Observable<Servicio> {
    return this.http.put<Servicio>(`${environment.url_ms_cinema}/servicios/${theService.id}`, theService).pipe(
      retryWhen(errors =>
        errors.pipe(
          delayWhen((_, i) => timer((i + 1) * this.retryDelay)),
          take(this.maxRetries),
          concatMap(error => throwError(() => error))
        )
      )
    );
  }

  delete(id: number) {
    return this.http.delete<Servicio>(`${environment.url_ms_cinema}/servicios/${id}`).pipe(
      retryWhen(errors =>
        errors.pipe(
          delayWhen((_, i) => timer((i + 1) * this.retryDelay)),
          take(this.maxRetries),
          concatMap(error => throwError(() => error))
        )
      )
    );
  }
}