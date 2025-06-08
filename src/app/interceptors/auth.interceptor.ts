import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { SeguridadService } from '../services/seguridadService/seguridad.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private seguridadService: SeguridadService, private router: Router) { }
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // Si la solicitud es para la ruta de "login", no adjuntes el token
    if (request.url.includes('/login') || request.url.includes('/token-validation')) {
      return next.handle(request);
    }

    if (this.seguridadService.usuarioSesionActiva) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.seguridadService.usuarioSesionActiva.token}`
        }
      });
    }

    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status === 401) {
          this.router.navigateByUrl('/pages/dashboard');
        }
        return throwError(err);
      })
    );
  }
}
