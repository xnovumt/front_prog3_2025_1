import { Component, OnInit, OnDestroy } from '@angular/core'; // Importa OnDestroy
import { SeguridadService } from '../../services/seguridadService/seguridad.service'; // Ajusta la ruta si es necesario
import { Usuario } from '../../models/usuario.model'; // Asegúrate de que esta ruta sea correcta
import { Subscription } from 'rxjs'; // Para manejar la suscripción
import { Router } from '@angular/router'; // Importa Router si necesitas redirigir

@Component({
  selector: 'app-usuario-profile',
  templateUrl: './usuario-profile.component.html',
  styleUrls: ['./usuario-profile.component.scss']
})
export class usuarioProfileComponent implements OnInit, OnDestroy { // Implementa OnDestroy
  usuario: Usuario | null = null; // Variable para almacenar la información del usuario
  private usuarioSubscription: Subscription; // Para manejar la suscripción y desuscribirse

  constructor(private seguridadService: SeguridadService) { }

  ngOnInit() {
    // Suscribirse a los cambios del usuario en seguridadService
    this.usuarioSubscription = this.seguridadService.getUsuario().subscribe(
      (currentUsuario: Usuario) => {
        if (currentUsuario && currentUsuario._id) { // Verifica si el usuario está logueado
          this.usuario = currentUsuario;
          console.log('Usuario cargado en UsuarioProfileComponent:', this.usuario);
        } else {
          this.usuario = null; // No hay usuario logueado
          console.log('No hay usuario logueado.');
          // Opcional: Redirigir al login si no hay sesión
          // this.router.navigate(['/auth/login']);
        }
      }
    );

    // Inicialmente, cargar el usuario actual si ya hay una sesión activa
    if (this.seguridadService.existSession()) {
      this.usuario = this.seguridadService.usuarioSesionActiva;
    }
  }

  ngOnDestroy(): void {
    // Es buena práctica desuscribirse para evitar fugas de memoria
    if (this.usuarioSubscription) {
      this.usuarioSubscription.unsubscribe();
    }
  }
}