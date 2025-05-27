// shift/list/list.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Turno } from 'src/app/models/turno.model';
import { TurnoService } from 'src/app/services/turnoService/turno.service';
import Swal from 'sweetalert2'; // Import SweetAlert2

@Component({
  selector: 'app-list-Turno',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListTurnoComponent implements OnInit {

  turnos: Turno[] = []; // Array to store Turnos

  // Inject the service and Router (if needed)
  constructor(private TurnoService: TurnoService, private router: Router) { }
  ngOnInit(): void {
    this.TurnoService.list().subscribe(data => {
      this.turnos = data; // Assign data to the array property
    });
  }

  // Methods for edit and delete (adjust ID type based on your model)
  edit(id: number) {
    if (isNaN(id)) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'El ID proporcionado no es válido.'
      });
      return;
    }

    this.router.navigate(['/turnos/update', id]).then(
      success => {
        if (success) {
          Swal.fire({
            icon: 'success',
            title: 'Redirigido',
            text: 'Navegación exitosa al formulario de edición.'
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se pudo navegar al formulario de edición.'
          });
        }
      },
      error => {
        console.error('Error al navegar:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Ocurrió un error al intentar navegar al formulario de edición.'
        });
      }
    );
  }

  delete(id: number) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'No podrás revertir esta acción',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.TurnoService.delete(id).subscribe({
          next: () => {
            Swal.fire('Eliminado!', 'El registro ha sido eliminado.', 'success');
            this.ngOnInit(); // Recargar la lista después de eliminar
          },
          error: (error) => {
            console.error('Error al eliminar:', error);
            Swal.fire('Error', 'No se pudo eliminar el registro.', 'error');
          }
        });
      }
    });
  }

  view(id: number) {
    this.router.navigate(['/turnos/view', id]).then(
      success => {
        if (success) {
          Swal.fire({
            icon: 'success',
            title: 'Redirigido',
            text: 'Navegación exitosa al detalle del turno.'
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se pudo navegar al detalle del turno.'
          });
        }
      },
      error => {
        console.error('Error al navegar:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Ocurrió un error al intentar navegar al detalle del turno.'
        });
      }
    );
  }

  navigateToCreate() {
    this.router.navigate(['/turnos/create']).then(
      success => {
        if (success) {
          Swal.fire({
            icon: 'success',
            title: 'Redirigido',
            text: 'Navegación exitosa al formulario de creación.'
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se pudo navegar al formulario de creación.'
          });
        }
      },
      error => {
        console.error('Error al navegar:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Ocurrió un error al intentar navegar al formulario de creación.'
        });
      }
    );
  }
}