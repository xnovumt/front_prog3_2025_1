import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Servicio } from 'src/app/models/servicio.model';
import { ServicioService } from 'src/app/services/servicioService/servicio.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {

  mode: number; //1->View, 2->Create, 3-> Update
  servicio: Servicio;
  theFormGroup: FormGroup; // Form Police
  trySend: boolean

  constructor(private activateRoute: ActivatedRoute,
    private someServicio: ServicioService,
    private router: Router,
    private theFormBuilder: FormBuilder,
  ) {
    this.servicio = { id: 0 };
    this.theFormGroup = this.configFormGroup(); // Asigna el resultado a theFormGroup
    this.trySend = false
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
      this.servicio.id = this.activateRoute.snapshot.params.id
      this.getService(this.servicio.id)
    }
  }
getService(id: number) {
  this.someServicio.view(id).subscribe({
    next: (service) => {
      this.servicio = service;
      console.log('Service fetched successfully:', this.servicio);
      this.theFormGroup.patchValue(this.servicio);
      // Habilitar el campo ID solo si estamos en modo edición para mostrar el valor
      if (this.mode === 3) {
        this.theFormGroup.get('id')?.enable();
      }
    },
    error: (error) => {
      console.error('Error fetching service:', error);
    }
  });
}
  back() {
    this.router.navigate(['servicios/list'])
  }
  create() {
    this.trySend = true;
    if (this.theFormGroup.valid) {
      this.someServicio.create(this.theFormGroup.value).subscribe({ // Usa los valores del formulario
        next: () => {
          Swal.fire({
            title: 'Creado!',
            text: 'Registro creado correctamente.',
            icon: 'success'
          }).then(() => {
            this.router.navigate(['/servicio/list']); // Redirigir a la lista
          });
        },
        error: (error) => {
          console.error('Error al crear:', error);
          Swal.fire('Error', 'No se pudo crear el registro.', 'error');
        }
      });
    }
  }
update() {
    this.trySend = true;
    if (this.theFormGroup.valid) {
      // Crea un nuevo objeto con los valores del formulario
      const updatedData = { ...this.theFormGroup.value };

      // Envía este objeto junto con el ID del servicio que ya tienes
      this.someServicio.update({ ...updatedData, id: this.servicio.id }).subscribe({
        next: () => {
          Swal.fire({
            title: 'Actualizado!',
            text: 'Registro actualizado correctamente.',
            icon: 'success'
          }).then(() => {
            this.router.navigate(['/servicio/list']);
          });
        },
        error: (error) => {
          console.error('Error al actualizar:', error);
          Swal.fire('Error', 'No se pudo actualizar el registro.', 'error');
        }
      });
    }
  }
  delete(id: number) {
    console.log("Delete servicio with id:", id);
    Swal.fire({
      title: 'Eliminar',
      text: "Está seguro que quiere eliminar el registro?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.someServicio.delete(id).
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

configFormGroup(): FormGroup {
  return this.theFormBuilder.group({
    id: [{ value: 0, disabled: true }], // Inicializa y deshabilita el campo 'id'
    costo: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
    f_inicio: ['', Validators.required],
    f_fin: ['', Validators.required],
    prioridad: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(255)]],
    tipo: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(255)]],
    estado: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(255)]],
    ubicacion: ['', [Validators.minLength(2), Validators.maxLength(255)]],
    resumen: ['', [Validators.minLength(2), Validators.maxLength(255)]]
  });
}

  get getTheFormGroup() {
    return this.theFormGroup.controls
  }
}