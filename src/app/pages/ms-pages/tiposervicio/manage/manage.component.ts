import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TipoServicio } from 'src/app/models/tipo-servicio.model';
import { TipoServicioService } from 'src/app/services/tipoServicioService/tipo-servicio.service';
// import { SeguroService } from 'src/app/services/seguroService/seguro.service'; // Esta importación no se usa, se puede eliminar.
import Swal from 'sweetalert2';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {

  mode: number; //1->View, 2->Create, 3-> Update
  // tiposervicio: TipoServicio; // Ya no la necesitamos para la vinculación directa con el formulario.
  // La información del TipoServicio cargado/actual se gestionará con el FormGroup
  theFormGroup: FormGroup; // Reactive Form Group
  trySend: boolean; // Bandera para indicar que se intentó enviar y mostrar validaciones
  tipoServicioId: number | null = null; // Para almacenar el ID si estamos en modo view/update

  constructor(
    private activateRoute: ActivatedRoute,
    private someTipoServicio: TipoServicioService, // Renombrado para claridad en el servicio
    private router: Router,
    private theFormBuilder: FormBuilder,
  ) {
    // Inicializamos el FormGroup aquí. NO dependemos de 'tiposervicio' para esto.
    this.theFormGroup = this.configFormGroup();
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

    // Si hay un ID en la URL, significa que estamos en modo 'view' o 'update'
    if (this.activateRoute.snapshot.params.id) {
      this.tipoServicioId = this.activateRoute.snapshot.params.id;
      this.getTipoServicio(this.tipoServicioId);
    }
  }

  // Método para configurar el FormGroup con sus validadores
  configFormGroup(): FormGroup {
    return this.theFormBuilder.group({
      // El 'id' se incluye en el FormGroup pero su valor no se envía en 'create'
      // y se habilita/deshabilita según el modo.
      id: [{ value: '', disabled: true }], // El ID debe ser deshabilitado y no se enviará en .value
      nombre: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      // Aseguramos que descripción también sea 'required' si el HTML lo indica
      descripcion: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(255)]]
    });
  }

  // Método para obtener los datos de un TipoServicio y rellenar el formulario
  getTipoServicio(id: number) {
    this.someTipoServicio.view(id).subscribe({
      next: (tiposervicio: TipoServicio) => {
        // Rellenamos el FormGroup con los datos obtenidos del backend
        // patchValue es útil si no quieres actualizar todos los campos del FormGroup
        this.theFormGroup.patchValue({
          id: tiposervicio.id,
          nombre: tiposervicio.nombre,
          descripcion: tiposervicio.descripcion
        });
        console.log('TipoServicio fetched successfully:', tiposervicio);
      },
      error: (error) => {
        console.error('Error fetching TipoServicio:', error);
        Swal.fire({
          title: 'Error',
          text: 'No se pudo cargar el Tipo de Servicio. Intente de nuevo más tarde.',
          icon: 'error'
        });
        this.router.navigate(['/tiposervicios/list']); // Redirigir si falla la carga
      }
    });
  }

  back() {
    this.router.navigate(['tiposervicios/list']);
  }

  create() {
    this.trySend = true; // Activa la visualización de errores de validación
    if (this.theFormGroup.invalid) {
      console.warn('Intento de creación con formulario inválido.');
      Swal.fire({
        title: 'Formulario Inválido',
        text: 'Por favor, complete todos los campos requeridos y corrija los errores.',
        icon: 'error'
      });
      return; // Detiene la ejecución si el formulario no es válido
    }

    // Creamos el objeto a enviar al backend directamente desde el valor del FormGroup
    // El ID se omite intencionalmente para la creación, ya que el backend lo generará.
    const tipoServicioToCreate: TipoServicio = {
      nombre: this.theFormGroup.get('nombre')?.value,
      descripcion: this.theFormGroup.get('descripcion')?.value
    };

    this.someTipoServicio.create(tipoServicioToCreate).subscribe({
      next: (tiposervicio) => {
        console.log('TipoServicio creado correctamente:', tiposervicio);
        Swal.fire({
          title: 'Creado!',
          text: 'Registro creado correctamente.',
          icon: 'success',
        });
        this.router.navigate(['/tiposervicios/list']);
      },
      error: (error) => {
        console.error('Error al crear tiposervicio:', error);
        Swal.fire({
          title: 'Error',
          text: `No se pudo crear el registro: ${error.error?.message || error.message || 'Error desconocido'}`,
          icon: 'error',
        });
      }
    });
  }

  update() {
    this.trySend = true; // Activa la visualización de errores de validación
    if (this.theFormGroup.invalid) {
      console.warn('Intento de actualización con formulario inválido.');
      Swal.fire({
        title: 'Formulario Inválido',
        text: 'Por favor, complete todos los campos requeridos y corrija los errores.',
        icon: 'error'
      });
      return; // Detiene la ejecución si el formulario no es válido
    }

    // Creamos el objeto a enviar al backend para la actualización
    // Incluimos el ID, que es crucial para la operación de actualización en el backend.
    const tipoServicioToUpdate: TipoServicio = {
      id: this.tipoServicioId || 0, // Usamos el ID de la URL
      nombre: this.theFormGroup.get('nombre')?.value,
      descripcion: this.theFormGroup.get('descripcion')?.value
    };

    if (!tipoServicioToUpdate.id) {
      console.error('ID de tipo de servicio no encontrado para la actualización.');
      Swal.fire({
        title: 'Error',
        text: 'No se pudo determinar el ID para actualizar el tipo de servicio.',
        icon: 'error'
      });
      return;
    }

    this.someTipoServicio.update(tipoServicioToUpdate).subscribe({
      next: (tiposervicio) => {
        console.log('TipoServicio actualizado correctamente:', tiposervicio);
        Swal.fire({
          title: 'Actualizado!',
          text: 'Registro actualizado correctamente.',
          icon: 'success',
        });
        this.router.navigate(['/tiposervicios/list']);
      },
      error: (error) => {
        console.error('Error al actualizar tiposervicio:', error);
        Swal.fire({
          title: 'Error',
          text: `No se pudo actualizar el registro: ${error.error?.message || error.message || 'Error desconocido'}`,
          icon: 'error',
        });
      }
    });
  }

  delete(id: number) {
    console.log("Delete tiposervicio with id:", id);
    Swal.fire({
      title: 'Eliminar',
      text: "¿Está seguro que quiere eliminar el registro?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.someTipoServicio.delete(id).subscribe({
          next: () => {
            Swal.fire(
              'Eliminado!',
              'Registro eliminado correctamente.',
              'success'
            );
            this.router.navigate(['/tiposervicios/list']); // Redirigir a la lista después de eliminar
          },
          error: (error) => {
            console.error('Error al eliminar tiposervicio:', error);
            Swal.fire({
              title: 'Error',
              text: `No se pudo eliminar el registro: ${error.error?.message || error.message || 'Error desconocido'}`,
              icon: 'error',
            });
          }
        });
      }
    });
  }

  // Getter para acceder fácilmente a los controles del formulario desde el HTML
  get getTheFormGroup() {
    return this.theFormGroup.controls;
  }
}