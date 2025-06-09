import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProcedimientoMantenimiento } from 'src/app/models/procedimiento-mantenimiento.model';
import { Procedimiento } from 'src/app/models/procedimiento.model';
import { Mantenimiento } from 'src/app/models/mantenimiento.model';
import { ProcedimientoMantenimientoService } from 'src/app/services/procedimientoMantenimientoService/procedimiento-mantenimiento.service';
import { ProcedimientoService } from 'src/app/services/procedimientoService/procedimiento.service';
import { MantenimientoService } from 'src/app/services/mantenimientoService/mantenimiento.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {

  mode: number; //1->View, 2->Create, 3-> Update
  procedimientomantenimiento: ProcedimientoMantenimiento;
  theFormGroup: FormGroup;
  trySend: boolean;

  // Arrays para los selectores
  procedimientos: Procedimiento[] = [];
  mantenimientos: Mantenimiento[] = [];

  constructor(
    private activateRoute: ActivatedRoute,
    private someProcedimientoMantenimiento: ProcedimientoMantenimientoService,
    private procedimientoService: ProcedimientoService,
    private mantenimientoService: MantenimientoService,
    private router: Router,
    private theFormBuilder: FormBuilder,
  ) {
    this.procedimientomantenimiento = { id: 0 };
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

    // Cargar listas para los selectores
    this.loadProcedimientos();
    this.loadMantenimientos();

    if (this.activateRoute.snapshot.params.id) {
      this.procedimientomantenimiento.id = this.activateRoute.snapshot.params.id;
      this.getProcedimientoMantenimiento(this.procedimientomantenimiento.id);
    }
  }

  // Método para cargar procedimientos
  loadProcedimientos() {
    this.procedimientoService.list().subscribe({
      next: (response: any) => {
        if (response && response.data && Array.isArray(response.data)) {
          this.procedimientos = response.data;
        } else if (Array.isArray(response)) {
          this.procedimientos = response;
        } else {
          console.error('Estructura de respuesta inesperada para procedimientos:', response);
          this.procedimientos = [];
        }
        console.log('Procedimientos cargados:', this.procedimientos);
      },
      error: (error) => {
        console.error('Error cargando procedimientos:', error);
        this.procedimientos = [];
      }
    });
  }

  // Método para cargar mantenimientos
  loadMantenimientos() {
    this.mantenimientoService.list().subscribe({
      next: (response: any) => {
        if (response && response.data && Array.isArray(response.data)) {
          this.mantenimientos = response.data;
        } else if (Array.isArray(response)) {
          this.mantenimientos = response;
        } else {
          console.error('Estructura de respuesta inesperada para mantenimientos:', response);
          this.mantenimientos = [];
        }
        console.log('Mantenimientos cargados:', this.mantenimientos);
      },
      error: (error) => {
        console.error('Error cargando mantenimientos:', error);
        this.mantenimientos = [];
      }
    });
  }

  getProcedimientoMantenimiento(id: number) {
    this.someProcedimientoMantenimiento.view(id).subscribe({
      next: (procedimientomantenimiento) => {
        this.procedimientomantenimiento = procedimientomantenimiento;
        // Actualizar el FormGroup con los datos obtenidos
        this.theFormGroup.patchValue({
          id: procedimientomantenimiento.id,
          procedimiento_id: procedimientomantenimiento.procedimiento_id,
          mantenimiento_id: procedimientomantenimiento.mantenimiento_id,
          estado: procedimientomantenimiento.estado
        });
        console.log('ProcedimientoMantenimiento obtenido exitosamente:', this.procedimientomantenimiento);
      },
      error: (error) => {
        console.error('Error al obtener ProcedimientoMantenimiento:', error);
        Swal.fire('Error', 'No se pudo obtener el registro.', 'error');
      }
    });
  }

  back() {
    this.router.navigate(['procedimiento-mantenimiento/list']);
  }

  create() {
    this.trySend = true;
    
    if (this.theFormGroup.invalid) {
      Swal.fire('Error', 'Por favor, complete todos los campos obligatorios.', 'error');
      return;
    }

    // Obtener valores del formulario
    const formData = this.theFormGroup.value;
    const procedimientoMantenimientoData = {
      procedimiento_id: formData.procedimiento_id,
      mantenimiento_id: formData.mantenimiento_id,
      estado: formData.estado
    };

    console.log('Payload enviado al backend:', procedimientoMantenimientoData);
    
    this.someProcedimientoMantenimiento.create(procedimientoMantenimientoData).subscribe({
      next: (procedimientomantenimiento) => {
        console.log('ProcedimientoMantenimiento creado exitosamente:', procedimientomantenimiento);
        Swal.fire({
          title: '¡Creado!',
          text: 'Registro creado correctamente.',
          icon: 'success',
        }).then(() => {
          this.router.navigate(['/procedimiento-mantenimiento/list']);
        });
      },
      error: (error) => {
        console.error('Error al crear ProcedimientoMantenimiento:', error);
        Swal.fire('Error', 'No se pudo crear el registro.', 'error');
      }
    });
  }

  update() {
    this.trySend = true;
    
    if (this.theFormGroup.invalid) {
      Swal.fire('Error', 'Por favor, complete todos los campos obligatorios.', 'error');
      return;
    }

    // Obtener valores del formulario
    const formData = this.theFormGroup.value;
    const procedimientoMantenimientoData = {
      id: this.procedimientomantenimiento.id,
      procedimiento_id: formData.procedimiento_id,
      mantenimiento_id: formData.mantenimiento_id,
      estado: formData.estado
    };

    console.log('Payload enviado al backend:', procedimientoMantenimientoData);

    this.someProcedimientoMantenimiento.update(procedimientoMantenimientoData).subscribe({
      next: (procedimientomantenimiento) => {
        console.log('ProcedimientoMantenimiento actualizado exitosamente:', procedimientomantenimiento);
        Swal.fire({
          title: '¡Actualizado!',
          text: 'Registro actualizado correctamente.',
          icon: 'success',
        }).then(() => {
          this.router.navigate(['/procedimiento-mantenimiento/list']);
        });
      },
      error: (error) => {
        console.error('Error al actualizar ProcedimientoMantenimiento:', error);
        Swal.fire('Error', 'No se pudo actualizar el registro.', 'error');
      }
    });
  }

  delete(id: number) {
    console.log("Delete ProcedimientoMantenimiento with id:", id);
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
        this.someProcedimientoMantenimiento.delete(id).subscribe({
          next: () => {
            Swal.fire('¡Eliminado!', 'Registro eliminado correctamente.', 'success');
            this.router.navigate(['/procedimiento-mantenimiento/list']);
          },
          error: (error) => {
            console.error('Error al eliminar ProcedimientoMantenimiento:', error);
            Swal.fire('Error', 'No se pudo eliminar el registro.', 'error');
          }
        });
      }
    });
  }

  configFormGroup(): FormGroup {
    return this.theFormBuilder.group({
      id: [{ value: 0, disabled: true }],
      procedimiento_id: ['', [Validators.required]],
      mantenimiento_id: ['', [Validators.required]],
      estado: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
    });
  }

  get getTheFormGroup() {
    return this.theFormGroup.controls;
  }
}
