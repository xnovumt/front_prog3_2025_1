import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProcedimientoMantenimiento } from 'src/app/models/procedimiento-mantenimiento.model'; // Importa el modelo ProcedimientoMantenimiento
import { ProcedimientoMantenimientoService } from 'src/app/services/procedimientoMantenimientoService/procedimiento-mantenimiento.service'; // Importa el servicio ProcedimientoMantenimientoService
import Swal from 'sweetalert2';
// import { Router } from '@angular/router'; // Importa Router si necesitas navegación

@Component({
  selector: 'app-list-procedimiento-mantenimiento',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListProcedimientoMantenimientoComponent implements OnInit {

  procedimientomantenimientos: ProcedimientoMantenimiento[] = []; // Arreglo para almacenar vínculos, tipado con el modelo ProcedimientoMantenimiento

  // Inyecta el servicio ProcedimientoMantenimientoService y Router (si lo necesitas)
  constructor(private ProcedimientoMantenimientoService: ProcedimientoMantenimientoService, private router: Router) { }

  ngOnInit(): void {
    // Llama al servicio para obtener la lista de vínculos
    this.ProcedimientoMantenimientoService.list().subscribe(data => {
      this.procedimientomantenimientos = data; // Asigna los datos a la propiedad ProcedimientoMantenimientos
    });
  }

  // Métodos para editar y eliminar (ajusta el tipo de ID según tu modelo ProcedimientoMantenimiento)
  edit(id: number) {
    if (isNaN(id)) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'El ID proporcionado no es válido.'
      });
      return;
    }

    this.router.navigate([`/procedimiento-mantenimientos/update`, id]).then(
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
    console.log("Delete procedimientomantenimiento with id:", id);
    Swal.fire({
      title: 'Eliminar',
      text: "Está procedimientomantenimiento que quiere eliminar el registro?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.ProcedimientoMantenimientoService.delete(id).
          subscribe(data => {
            Swal.fire(
              'Eliminado!',
              'Registro eliminado correctamente.',
              'success'
            )
            this.ngOnInit();
          });
      }
    })
  }
  navigateToCreate() {
    this.router.navigate(['/procedimiento-mantenimientos/create']).then(
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

  // Nuevo método para navegar a la lista
  navigateToList() {
    this.router.navigate(['/procedimiento-mantenimientos/list']).then(
      success => {
        if (success) {
          console.log('Navegación exitosa a la lista.');
          // Opcional: puedes agregar un Swal aquí si quieres
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se pudo navegar a la lista.'
          });
        }
      },
      error => {
        console.error('Error al navegar a la lista:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Ocurrió un error al intentar navegar a la lista.'
        });
      }
    );
  }
}