import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OperarioEspecialidad } from 'src/app/models/operario-especialidad.model';
import { Operario } from 'src/app/models/operario.model';
import { Especialidad } from 'src/app/models/especialidad.model';
import { OperarioEspecialidadService } from 'src/app/services/operarioEspecialidadService/operario-especialidad.service';
import { OperarioService } from 'src/app/services/operarioService/operario.service';
import { EspecialidadesService } from 'src/app/services/especialidadesService/especialidades.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {

  mode: number; //1->View, 2->Create, 3-> Update
  operarioespecialidad: OperarioEspecialidad;

  // Arrays para los selectores
  operarios: Operario[] = [];
  especialidades: Especialidad[] = [];

  constructor(
    private activateRoute: ActivatedRoute,
    private someOperarioEspecialidad: OperarioEspecialidadService,
    private operarioService: OperarioService,
    private especialidadesService: EspecialidadesService,
    private router: Router
  ) {
    this.operarioespecialidad = {
      id: 0,
      operario_id: undefined,
      especialidad_id: undefined,
      nivel_experiencia: ''
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

    // Cargar listas para los selectores
    this.loadOperarios();
    this.loadEspecialidades();

    if (this.activateRoute.snapshot.params.id) {
      this.operarioespecialidad.id = this.activateRoute.snapshot.params.id;
      this.getOperarioEspecialidad(this.operarioespecialidad.id);
    }
  }

  // Método para cargar operarios
  loadOperarios() {
    this.operarioService.list().subscribe({
      next: (response: any) => {
        if (response && response.data && Array.isArray(response.data)) {
          this.operarios = response.data;
        } else if (Array.isArray(response)) {
          this.operarios = response;
        } else {
          console.error('Estructura de respuesta inesperada para operarios:', response);
          this.operarios = [];
        }
        console.log('Operarios cargados:', this.operarios);
      },
      error: (error) => {
        console.error('Error cargando operarios:', error);
        this.operarios = [];
      }
    });
  }

  // Método para cargar especialidades
  loadEspecialidades() {
    this.especialidadesService.list().subscribe({
      next: (response: any) => {
        if (response && response.data && Array.isArray(response.data)) {
          this.especialidades = response.data;
        } else if (Array.isArray(response)) {
          this.especialidades = response;
        } else {
          console.error('Estructura de respuesta inesperada para especialidades:', response);
          this.especialidades = [];
        }
        console.log('Especialidades cargadas:', this.especialidades);
      },
      error: (error) => {
        console.error('Error cargando especialidades:', error);
        this.especialidades = [];
      }
    });
  }

  getOperarioEspecialidad(id: number) {
    this.someOperarioEspecialidad.view(id).subscribe({
      next: (operarioespecialidad) => {
        this.operarioespecialidad = operarioespecialidad;
        console.log('OperarioEspecialidad obtenido exitosamente:', this.operarioespecialidad);
      },
      error: (error) => {
        console.error('Error al obtener OperarioEspecialidad:', error);
        Swal.fire('Error', 'No se pudo obtener el registro.', 'error');
      }
    });
  }

  back() {
    this.router.navigate(['especialidad-operarios/list']);
  }

  create() {
    if (!this.validateOperarioEspecialidad()) {
      Swal.fire('Error', 'Por favor, complete todos los campos obligatorios.', 'error');
      return;
    }

    console.log('Payload enviado al backend:', this.operarioespecialidad);
    this.someOperarioEspecialidad.create(this.operarioespecialidad).subscribe({
      next: (operarioespecialidad) => {
        console.log('OperarioEspecialidad creado exitosamente:', operarioespecialidad);
        Swal.fire({
          title: '¡Creado!',
          text: 'Registro creado correctamente.',
          icon: 'success',
        }).then(() => {
          this.router.navigate(['/especialidad-operarios/list']);
        });
      },
      error: (error) => {
        console.error('Error al crear OperarioEspecialidad:', error);
        Swal.fire('Error', 'No se pudo crear el registro.', 'error');
      }
    });
  }

  update() {
    if (!this.validateOperarioEspecialidad()) {
      Swal.fire('Error', 'Por favor, complete todos los campos obligatorios.', 'error');
      return;
    }

    this.someOperarioEspecialidad.update(this.operarioespecialidad).subscribe({
      next: (operarioespecialidad) => {
        console.log('OperarioEspecialidad actualizado exitosamente:', operarioespecialidad);
        Swal.fire({
          title: '¡Actualizado!',
          text: 'Registro actualizado correctamente.',
          icon: 'success',
        }).then(() => {
          this.router.navigate(['/especialidad-operarios/list']);
        });
      },
      error: (error) => {
        console.error('Error al actualizar OperarioEspecialidad:', error);
        Swal.fire('Error', 'No se pudo actualizar el registro.', 'error');
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
        this.someOperarioEspecialidad.delete(id).subscribe({
          next: () => {
            Swal.fire('¡Eliminado!', 'Registro eliminado correctamente.', 'success');
            this.router.navigate(['/especialidad-operarios/list']);
          },
          error: (error) => {
            console.error('Error al eliminar OperarioEspecialidad:', error);
            Swal.fire('Error', 'No se pudo eliminar el registro.', 'error');
          }
        });
      }
    });
  }

  // Validación
  private validateOperarioEspecialidad(): boolean {
    return !!this.operarioespecialidad.operario_id &&
      !!this.operarioespecialidad.especialidad_id &&
      !!this.operarioespecialidad.nivel_experiencia;
  }
}
