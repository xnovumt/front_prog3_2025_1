import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Especialidad } from 'src/app/models/especialidad.model';
import { EspecialidadesService } from 'src/app/services/especialidadesService/especialidades.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {

  mode: number; // 1->View, 2->Create, 3->Update
  especialidad: Especialidad;

  constructor(private activateRoute: ActivatedRoute,
              private especialidadesService: EspecialidadesService,
              private router: Router) {
    this.especialidad = { id: 0 };
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
    if (this.activateRoute.snapshot.params.id) {
      this.especialidad.id = this.activateRoute.snapshot.params.id;
      this.getEspecialidad(this.especialidad.id);
    }
  }

  getEspecialidad(id: number) {
    this.especialidadesService.view(id).subscribe({
      next: (especialidad) => {
        this.especialidad = especialidad;
        console.log('Especialidad fetched successfully:', this.especialidad);
      },
      error: (error) => {
        console.error('Error fetching especialidad:', error);
      }
    });
  }

  back() {
    this.router.navigate(['/especialidades/list']);
  }

  create() {
    this.especialidadesService.create(this.especialidad).subscribe({
      next: (especialidad) => {
        console.log('Especialidad created successfully:', especialidad);
        Swal.fire({
          title: 'Creado!',
          text: 'Registro creado correctamente.',
          icon: 'success',
        }).then(() => {
          this.router.navigate(['/especialidades/list']);
        });
      },
      error: (error) => {
        console.error('Error creating especialidad:', error);
      }
    });
  }

  update() {
    this.especialidadesService.update(this.especialidad).subscribe({
      next: (especialidad) => {
        console.log('Especialidad updated successfully:', especialidad);
        Swal.fire({
          title: 'Actualizado!',
          text: 'Registro actualizado correctamente.',
          icon: 'success',
        });
        this.router.navigate(['/especialidades/list']);
      },
      error: (error) => {
        console.error('Error updating especialidad:', error);
      }
    });
  }

  delete(id: number) {
    console.log('Delete especialidad with id:', id);
    Swal.fire({
      title: 'Eliminar',
      text: 'Está seguro que quiere eliminar el registro?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.especialidadesService.delete(id).subscribe({
          next: () => {
            Swal.fire('Eliminado!', 'Registro eliminado correctamente.', 'success');
            this.ngOnInit();
          },
          error: (error) => {
            console.error('Error deleting especialidad:', error);
          }
        });
      }
    });
  }
}
