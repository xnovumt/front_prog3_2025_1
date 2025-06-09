import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EspecialidadMaquinaria } from 'src/app/models/especialidad-maquinaria.model';
import { TipoServicio } from 'src/app/models/tipo-servicio.model';
import { Maquina } from 'src/app/models/maquina.model';
import { Especialidad } from 'src/app/models/especialidad.model';
import { EspecialidadMaquinariaService } from 'src/app/services/especialidadMaquinariaService/especialidad-maquina.service';
import { TipoServicioService } from 'src/app/services/tipoServicioService/tipo-servicio.service';
import { MaquinaService } from 'src/app/services/maquinaService/maquina.service';
import { EspecialidadesService } from 'src/app/services/especialidadesService/especialidades.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {

  mode: number; //1->View, 2->Create, 3-> Update
  especialidadmaquinaria: EspecialidadMaquinaria;
  theFormGroup: FormGroup;
  trySend: boolean;

  // Arrays para los selectores
  tipo_servicios: TipoServicio[] = [];
  maquinas: Maquina[] = [];
  especialidades: Especialidad[] = [];

  constructor(private activateRoute: ActivatedRoute,
    private someEspecialidadMaquinaria: EspecialidadMaquinariaService,
    private router: Router,
    private theFormBuilder: FormBuilder,
    private tipoServicioService: TipoServicioService,
    private maquinaService: MaquinaService,
    private especialidadesService: EspecialidadesService
  ) {
    this.especialidadmaquinaria = {
      id: 0,
      tipo_servicio_id: undefined,
      maquina_id: undefined,
      especialidad_id: undefined,
      tipo_trabajo: ''
    };
    this.configFormGroup();
    this.trySend = false;
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

    // Cargar todas las listas para los selectores
    this.loadTipoServicios();
    this.loadMaquinas();
    this.loadEspecialidades();

    if (this.activateRoute.snapshot.params.id) {
      this.especialidadmaquinaria.id = this.activateRoute.snapshot.params.id;
      this.getEspecialidadMaquinaria(this.especialidadmaquinaria.id);
    }
  }

  // Métodos para cargar datos de los selectores
  loadTipoServicios() {
    this.tipoServicioService.list().subscribe({
      next: (data) => {
        this.tipo_servicios = data;
        console.log('Tipos de servicio cargados:', this.tipo_servicios);
      },
      error: (error) => {
        console.error('Error cargando tipos de servicio:', error);
      }
    });
  }

  loadMaquinas() {
    this.maquinaService.list().subscribe({
      next: (data) => {
        this.maquinas = data;
        console.log('Máquinas cargadas:', this.maquinas);
      },
      error: (error) => {
        console.error('Error cargando máquinas:', error);
      }
    });
  }

  loadEspecialidades() {
    this.especialidadesService.list().subscribe({
      next: (data) => {
        this.especialidades = data;
        console.log('Especialidades cargadas:', this.especialidades);
      },
      error: (error) => {
        console.error('Error cargando especialidades:', error);
      }
    });
  }

  getEspecialidadMaquinaria(id: number) {
    this.someEspecialidadMaquinaria.view(id).subscribe({
      next: (especialidadmaquinaria) => {
        this.especialidadmaquinaria = especialidadmaquinaria;
        console.log('EspecialidadMaquinaria fetched successfully:', this.especialidadmaquinaria);
      },
      error: (error) => {
        console.error('Error fetching especialidadmaquinaria:', error);
      }
    });
  }
  back() {
    this.router.navigate(['especialidad-maquinaria/list'])
  }
  create() {
    this.trySend = true
    this.someEspecialidadMaquinaria.create(this.especialidadmaquinaria).subscribe({
      next: (especialidadmaquinaria) => {
        console.log('especialidadmaquinaria created successfully:', especialidadmaquinaria);
        Swal.fire({
          title: 'Creado!',
          text: 'Registro creado correctamente.',
          icon: 'success',
        }).then(() => {
          this.router.navigate(['/especialidad-maquinarias/list']); // Redirigir a la lista
        });
      },
      error: (error) => {
        console.error('Error creating especialidadmaquinaria:', error);
        Swal.fire('Error', 'No se pudo crear el registro.', 'error');
      }
    });
  }
  update() {
    this.someEspecialidadMaquinaria.update(this.especialidadmaquinaria).subscribe({
      next: (especialidadmaquinaria) => {
        console.log('especialidadmaquinaria updated successfully:', especialidadmaquinaria);
        Swal.fire({
          title: 'Actualizado!',
          text: 'Registro actualizado correctamente.',
          icon: 'success',
        }).then(() => {
          this.router.navigate(['/especialidad-maquinarias/list']); // Redirigir a la lista
        });
      },
      error: (error) => {
        console.error('Error updating especialidadmaquinaria:', error);
        Swal.fire('Error', 'No se pudo actualizar el registro.', 'error');
      }
    });
  }
  delete(id: number) {
    console.log("Delete especialidadmaquinaria with id:", id);
    Swal.fire({
      title: 'Eliminar',
      text: "Está especialidadmaquinaria que quiere eliminar el registro?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.someEspecialidadMaquinaria.delete(id).
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
  edit(id: number) {
    if (isNaN(id)) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'El ID proporcionado no es válido.'
      });
      return;
    }

    this.router.navigate([`/especialidad-maquinaria/update`, id]).then(
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

  configFormGroup() {
    this.theFormGroup = this.theFormBuilder.group({
      tipo_servicio_id: [null, [Validators.required]],
      maquina_id: [null, [Validators.required]],
      especialidad_id: [null, [Validators.required]],
      tipo_trabajo: ['', [Validators.required, Validators.minLength(2)]]
    });
  }

  get getTheFormGroup() {
    return this.theFormGroup.controls;
  }

}
