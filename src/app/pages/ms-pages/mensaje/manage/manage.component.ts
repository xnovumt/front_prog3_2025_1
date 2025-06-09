import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MensajeService } from 'src/app/services/mensajeService/mensaje.service';
import { Mensaje } from 'src/app/models/mensaje.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {
  mode: number = 1;
  mensaje: Mensaje = {};

  constructor(
    private activateRoute: ActivatedRoute,
    private mensajeService: MensajeService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const currentUrl = this.activateRoute.snapshot.url.join('/');
    if (currentUrl.includes('view')) {
      this.mode = 1;
    } else if (currentUrl.includes('create')) {
      this.mode = 2;
    } else if (currentUrl.includes('update')) {
      this.mode = 3;
    }

    if (this.activateRoute.snapshot.params.id) {
      this.mensaje.id = this.activateRoute.snapshot.params.id;
      this.getMensaje(this.mensaje.id);
    }
  }

  getMensaje(id: number) {
    this.mensajeService.view(id).subscribe({
      next: (mensaje) => {
        this.mensaje = mensaje;
        console.log('Mensaje obtenido:', mensaje);
      },
      error: (error) => {
        console.error('Error al obtener mensaje:', error);
        Swal.fire('Error', 'No se pudo obtener el mensaje.', 'error');
      }
    });
  }

  create() {
    console.log('Creando mensaje:', this.mensaje);
    this.mensajeService.create(this.mensaje).subscribe({
      next: (mensaje) => {
        console.log('Mensaje creado exitosamente:', mensaje);
        Swal.fire({
          title: '¡Creado!',
          text: 'Mensaje creado correctamente.',
          icon: 'success',
        }).then(() => {
          this.router.navigate(['/mensajes/list']);
        });
      },
      error: (error) => {
        console.error('Error al crear mensaje:', error);
        Swal.fire('Error', 'No se pudo crear el mensaje.', 'error');
      }
    });
  }

  update() {
    console.log('Actualizando mensaje:', this.mensaje);
    this.mensajeService.update(this.mensaje).subscribe({
      next: (mensaje) => {
        console.log('Mensaje actualizado exitosamente:', mensaje);
        Swal.fire({
          title: '¡Actualizado!',
          text: 'Mensaje actualizado correctamente.',
          icon: 'success',
        }).then(() => {
          this.router.navigate(['/mensajes/list']);
        });
      },
      error: (error) => {
        console.error('Error al actualizar mensaje:', error);
        Swal.fire('Error', 'No se pudo actualizar el mensaje.', 'error');
      }
    });
  }

  back() {
    this.router.navigate(['/mensajes/list']);
  }

  delete(id: number) {
    Swal.fire({
      title: '¿Está seguro?',
      text: '¡No podrá revertir esto!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminarlo!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.mensajeService.delete(id).subscribe({
          next: () => {
            Swal.fire('¡Eliminado!', 'El mensaje ha sido eliminado.', 'success');
            this.router.navigate(['/mensajes/list']);
          },
          error: (error) => {
            console.error('Error al eliminar mensaje:', error);
            Swal.fire('Error', 'No se pudo eliminar el mensaje.', 'error');
          }
        });
      }
    });
  }
}
