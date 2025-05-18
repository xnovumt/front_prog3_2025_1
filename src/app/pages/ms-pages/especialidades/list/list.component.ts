import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { Especialidad } from 'src/app/models/especialidad.model';
import { EspecialidadesService } from 'src/app/services/especialidadesService/especialidades.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-especialidad',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListEspecialidadComponent implements OnInit {

  especialidades: Especialidad[] = [];

  constructor(private especialidadesService: EspecialidadesService, private router: Router, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.especialidadesService.list().subscribe(
      data => {
        this.especialidades = data;
        this.cdr.detectChanges();
      },
      error => {
        console.error('Error al cargar las especialidades:', error);
      }
    );
  }

  edit(id: number) {
    if (isNaN(id)) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'El ID proporcionado no es válido.'
      });
      return;
    }

    this.router.navigate([`/especialidades/update`, id]).then(
      success => {
        if (!success) {
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
      confirmButtonText: 'Sí, eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.especialidadesService.delete(id).subscribe(
          () => {
            this.especialidades = this.especialidades.filter(especialidad => especialidad.id !== id);
            Swal.fire('Eliminado!', 'El registro ha sido eliminado.', 'success');
          },
          error => {
            console.error('Error al eliminar la especialidad:', error);
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Hubo un error al intentar eliminar la especialidad.'
            });
          }
        );
      }
    });
  }

  update(especialidad: Especialidad) {
    this.especialidadesService.update(especialidad).subscribe(
      () => {
        Swal.fire({
          title: 'Actualizado!',
          text: 'Registro actualizado correctamente.',
          icon: 'success'
        }).then(() => {
          this.router.navigate(['/especialidades/list']);
        });
      },
      error => {
        console.error('Error al actualizar la especialidad:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Hubo un error al intentar actualizar la especialidad.'
        });
      }
    );
  }
}