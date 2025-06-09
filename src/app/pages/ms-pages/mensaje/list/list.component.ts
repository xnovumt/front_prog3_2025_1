// message/list/list.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MensajeService } from 'src/app/services/mensajeService/mensaje.service';
import { Mensaje } from 'src/app/models/mensaje.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  mensajes: Mensaje[] = [];
  isLoading: boolean = true;

  constructor(
    private mensajeService: MensajeService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadMensajes();
  }

  loadMensajes() {
    this.isLoading = true;
    this.mensajeService.list().subscribe({
      next: (response: any) => {
        console.log('Respuesta del servidor:', response);

        // Manejar diferentes estructuras de respuesta
        if (response && response.data && Array.isArray(response.data)) {
          this.mensajes = response.data;
        } else if (Array.isArray(response)) {
          this.mensajes = response;
        } else {
          console.error('Estructura de respuesta inesperada:', response);
          this.mensajes = [];
        }

        console.log('Mensajes cargados:', this.mensajes);
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error al cargar mensajes:', error);
        this.isLoading = false;

        let errorMessage = 'No se pudieron cargar los mensajes.';
        if (error.status === 401) {
          errorMessage = 'Su sesión ha expirado. Por favor, inicie sesión nuevamente.';
        }

        Swal.fire('Error', errorMessage, 'error');
      }
    });
  }

  view(id: number) {
    this.router.navigate(['/mensajes/view', id]).then(
      success => {
        if (!success) {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se pudo navegar al detalle del mensaje.'
          });
        }
      }
    );
  }

  edit(id: number) {
    this.router.navigate(['/mensajes/update', id]).then(
      success => {
        if (!success) {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se pudo navegar a la edición del mensaje.'
          });
        }
      }
    );
  }

  create() {
    this.router.navigate(['/mensajes/create']).then(
      success => {
        if (!success) {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se pudo navegar a la creación de mensaje.'
          });
        }
      }
    );
  }

  delete(id: number) {
    Swal.fire({
      title: '¿Está seguro?',
      text: '¡No podrá revertir esta acción!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.mensajeService.delete(id).subscribe({
          next: () => {
            Swal.fire('¡Eliminado!', 'El mensaje ha sido eliminado.', 'success');
            // Recargar la lista después de eliminar
            this.loadMensajes();
          },
          error: (error) => {
            console.error('Error al eliminar mensaje:', error);
            let errorMessage = 'No se pudo eliminar el mensaje.';
            if (error.error && error.error.message) {
              errorMessage = error.error.message;
            }
            Swal.fire('Error', errorMessage, 'error');
          }
        });
      }
    });
  }

  // Método auxiliar para formatear fechas
  formatDate(dateString: string): string {
    if (!dateString) return 'N/A';

    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return 'Fecha inválida';

      return date.toLocaleDateString('es-ES', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (error) {
      console.error('Error formateando fecha:', error);
      return dateString;
    }
  }
}