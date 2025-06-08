import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { User } from 'src/app/models/user.model';

interface RespuestaLogin {
  token?: string;
  requiresTwoFactor?: boolean;
  user?: {
    _id: string;
    name?: string;
    email?: string;
  };
  message?: string;
  error?: any;
}

@Injectable({
  providedIn: 'root', // Makes the service available application-wide
})
export class SecurityService {
  private theUser = new BehaviorSubject<User>(new User());

  constructor(private http: HttpClient) {
    this.verifyActualSession();
  }

  public get activeUserSession(): User {
    return this.theUser.value;
  }

  // Primera fase de login con email y password
  login(email: string, password: string): Observable<RespuestaLogin> {
    return this.http.post<any>(`${environment.ms_security}/api/public/security/login`, {
      email,
      password
    }).pipe(
      map(response => {
        console.log('Respuesta del login:', response);
        // Si la respuesta es un string, intentamos parsearlo
        if (typeof response === 'string') {
          try {
            return JSON.parse(response);
          } catch (e) {
            console.error('Error parseando respuesta:', e);
            throw new Error('Formato de respuesta inválido');
          }
        }
        return response;
      }),
      catchError(error => {
        console.error('Error en login:', error);
        if (error.status === 500) {
          console.error('Error del servidor: Verifique el backend para más detalles.');
          throw new Error('Error interno del servidor. Por favor, intente más tarde.');
        } else if (error.status === 400) {
          console.error('Solicitud inválida: Verifique los datos enviados.');
          throw new Error('Datos de inicio de sesión inválidos. Por favor, revise su correo y contraseña.');
        } else {
          throw new Error('Ocurrió un error inesperado. Por favor, intente más tarde.');
        }
      })
    );
  }

  // Segunda fase de login con código 2FA
  validateTwoFactor(code2FA: string): Observable<RespuestaLogin> {
    return this.http.post<any>(`${environment.ms_security}/api/public/security/login/validate/${code2FA}`, {}).pipe(
      map(response => {
        console.log('Respuesta 2FA:', response);
        let parsedResponse: RespuestaLogin;

        // Si la respuesta es un string (token), la formateamos
        if (typeof response === 'string') {
          parsedResponse = {
            token: response
          };
        } else {
          parsedResponse = response;
        }

        // Si tenemos un token, guardamos la sesión
        if (parsedResponse.token) {
          this.guardarDatosSesion(parsedResponse);
        }

        return parsedResponse;
      }),
      catchError(error => {
        console.error('Error en validateTwoFactor:', error);
        throw error;
      })
    );
  }


  setUser(user: User) {
    this.theUser.next(user);
  }

  getUser() {
    return this.theUser.asObservable();
  }

  guardarDatosSesion(datosSesion: RespuestaLogin) {
    try {
      console.log('Datos de sesión recibidos:', datosSesion);
      if (!datosSesion.token) {
        console.error('No se recibió el token de autenticación en los datos de sesión:', datosSesion);
        throw new Error('No se recibió el token de autenticación');
      }

      // Crear un nuevo objeto Usuario con los datos de la sesión
      const usuarioData = new User();
      usuarioData.token = datosSesion.token;
      usuarioData._id = datosSesion.user?._id || '';
      usuarioData.email = datosSesion.user?.email || '';
      usuarioData.name = datosSesion.user?.name || '';

      localStorage.setItem('sesion', JSON.stringify(usuarioData));
      this.setUser(usuarioData);
    } catch (error) {
      console.error('Error al guardar datos de sesión:', error);
      throw error;
    }
  }

  saveSession(data: RespuestaLogin): void {
    this.guardarDatosSesion(data);
  }

  /**
  * Permite cerrar la sesión del usuario
  * que estaba previamente logueado
  */
  logout() {
    localStorage.removeItem('sesion');
    this.setUser(new User());
  }
  /**
  * Permite verificar si actualmente en el local storage
  * existe información de un usuario previamente logueado
  */
  verifyActualSession() {
    let actualSesion = this.getSessionData();
    if (actualSesion) {
      try {
        const datosUsuario = JSON.parse(actualSesion);
        if (datosUsuario && datosUsuario.token) {
          this.setUser(datosUsuario);
        }
      } catch (error) {
        console.error('Error al parsear datos de sesión:', error);
        this.logout(); // Limpia la sesión si hay error
    }
  } }
  /**
  * Verifica si hay una sesion activa
  * @returns
  */
  existSession(): boolean {
    let sesionActual = this.getSessionData();
    return (sesionActual) ? true : false;
  }
  /**
  * Permite obtener los dato de la sesión activa en el
  * local storage
  * @returns
  */
  getSessionData() {
    let sesionActual = localStorage.getItem('sesion');
    return sesionActual;
  }
  

}
