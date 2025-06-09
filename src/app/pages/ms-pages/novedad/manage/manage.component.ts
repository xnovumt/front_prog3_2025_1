import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Novedad } from 'src/app/models/novedad.model';
import { Turno } from 'src/app/models/turno.model';
import { NovedadService } from 'src/app/services/novedadService/novedad.service';
import { TurnoService } from 'src/app/services/turnoService/turno.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {

  mode: number; //1->View, 2->Create, 3-> Update
  novedad: Novedad;
  
  // Array para el selector de turnos
  turnos: Turno[] = [];

  constructor(
    private activateRoute: ActivatedRoute,
    private someNovedad: NovedadService,
    private turnoService: TurnoService,
    private router: Router
  ) {
    this.novedad = { 
      id: 0,
      tipo: '',
      descripcion: '',
      gravedad: '',
      turno_id: undefined
    };
  }

  ngOnInit(): void {
    const currentUrl = this.activateRoute.snapshot.url.join('/');
    if (currentUrl.includes('view')) {
      this.mode = 1;
    } else if (currentUrl.includes('create')) {
      this.mode = 2;
    } else if (currentUrl.includes('update')) {
      this.mode = 3;
    }

    // Cargar turnos para el selector
    this.loadTurnos();

    if (this.activateRoute.snapshot.params.id) {
      this.novedad.id = this.activateRoute.snapshot.params.id;
      this.getNovedad(this.novedad.id);
    }
  }

  // Método para cargar turnos
  loadTurnos() {
    this.turnoService.list().subscribe({
      next: (data) => {
        this.turnos = data;
        console.log('Turnos cargados:', this.turnos);
      },
      error: (error) => {
        console.error('Error cargando turnos:', error);
      }
    });
  }

  getNovedad(id: number) {
    this.someNovedad.view(id).subscribe({
      next: (novedad) => {
        this.novedad = novedad;
        console.log('Novedad obtenida exitosamente:', this.novedad);
      },
      error: (error) => {
        console.error('Error al obtener novedad:', error);
        Swal.fire('Error', 'No se pudo obtener la novedad.', 'error');
      }
    });
  }

  back() {
    this.router.navigate(['novedades/list']);
  }

  create() {
    if (!this.validateNovedad()) {
      Swal.fire('Error', 'Por favor, complete todos los campos obligatorios.', 'error');
      return;
    }

    console.log('Payload enviado al backend:', this.novedad);
    this.someNovedad.create(this.novedad).subscribe({
      next: (novedad) => {
        console.log('Novedad creada exitosamente:', novedad);
        Swal.fire({
          title: '¡Creado!',
          text: 'Registro creado correctamente.',
          icon: 'success',
        }).then(() => {
          this.router.navigate(['/novedades/list']);
        });
      },
      error: (error) => {
        console.error('Error al crear novedad:', error);
        Swal.fire('Error', 'No se pudo crear la novedad.', 'error');
      }
    });
  }

  update() {
    if (!this.validateNovedad()) {
      Swal.fire('Error', 'Por favor, complete todos los campos obligatorios.', 'error');
      return;
    }

    this.someNovedad.update(this.novedad).subscribe({
      next: (novedad) => {
        console.log('Novedad actualizada exitosamente:', novedad);
        Swal.fire({
          title: '¡Actualizado!',
          text: 'Registro actualizado correctamente.',
          icon: 'success',
        }).then(() => {
          this.router.navigate(['/novedades/list']);
        });
      },
      error: (error) => {
        console.error('Error al actualizar novedad:', error);
        Swal.fire('Error', 'No se pudo actualizar la novedad.', 'error');
      }
    });
  }

  delete(id: number) {
    Swal.fire({
      title: 'Eliminar',
      text: '¿Está seguro que quiere eliminar el registro?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.someNovedad.delete(id).subscribe({
          next: () => {
            Swal.fire('¡Eliminado!', 'Registro eliminado correctamente.', 'success');
            this.router.navigate(['/novedades/list']);
          },
          error: (error) => {
            console.error('Error al eliminar novedad:', error);
            Swal.fire('Error', 'No se pudo eliminar la novedad.', 'error');
          }
        });
      }
    });
  }

  // Validación
  private validateNovedad(): boolean {
    return !!this.novedad.tipo && 
           !!this.novedad.descripcion && 
           !!this.novedad.gravedad && 
           !!this.novedad.turno_id;
  }
}
