import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Seguro } from 'src/app/models/seguro.model';
import { SeguroService } from 'src/app/services/seguroService/seguro.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {

  mode: number; //1->View, 2->Create, 3-> Update
  seguro: Seguro;
  theFormGroup: FormGroup; // Form Police
  trySend: boolean;

  constructor(private activateRoute: ActivatedRoute,
    private someSeguro: SeguroService,
    private router: Router,
    private theFormBuilder: FormBuilder,
  ) {
    this.seguro = { id: 0 };
    this.theFormGroup = this.configFormGroup(); // Inicializa el FormGroup
    this.trySend = false;
  }

  ngOnInit(): void {
    const currentUrl = this.activateRoute.snapshot.url.join('/');
    if (currentUrl.includes('view')) {
      this.mode = 1;
      this.theFormGroup.disable(); // Deshabilitar el formulario en modo vista
      this.getSeguro(this.seguro.id);
    } else if (currentUrl.includes('create')) {
      this.mode = 2;
    } else if (currentUrl.includes('update')) {
      this.mode = 3;
      this.getSeguro(this.seguro.id);
    }
    if (this.activateRoute.snapshot.params.id) {
      this.seguro.id = this.activateRoute.snapshot.params.id;
      if (this.mode === 3) {
        this.getSeguro(this.seguro.id);
      }
    }
  }
  getSeguro(id: number) {
    console.log('Obteniendo seguro con ID:', id);

    this.someSeguro.view(id).subscribe({
      next: (seguro) => {
        console.log('Seguro obtenido exitosamente:', seguro);
        this.seguro = seguro;

        // Verificar que el ID se haya asignado correctamente
        console.log('ID asignado al objeto seguro:', this.seguro.id);

        // Actualizar el FormGroup con los datos obtenidos
        this.theFormGroup.patchValue({
          id: seguro.id,
          nombre: seguro.nombre,
          descripcion: seguro.descripcion
        });

        console.log('FormGroup actualizado:', this.theFormGroup.value);
      },
      error: (error) => {
        console.error('Error al obtener seguro:', error);
        Swal.fire('Error', 'No se pudo obtener el seguro.', 'error');
      }
    });
  }
  back() {
    this.router.navigate(['seguros/list']);
  }
  create() {
    this.trySend = true;
    if (this.theFormGroup.valid) {
      this.someSeguro.create(this.theFormGroup.value).subscribe({ // Usa theFormGroup.value
        next: (seguro) => {
          console.log('seguro created successfully:', seguro);
          Swal.fire({
            title: 'Creado!',
            text: 'Registro creado correctamente.',
            icon: 'success',
          });
          this.router.navigate(['/seguros/list']);
        },
        error: (error) => {
          console.error('Error creating seguro:', error);
        }
      });
    }
  }
  update() {
    this.trySend = true;

    if (this.theFormGroup.invalid) {
      Swal.fire('Error', 'Por favor, complete todos los campos obligatorios.', 'error');
      return;
    }

    // Debug: Verificar el estado actual
    console.log('Estado actual del seguro:', this.seguro);
    console.log('Valores del formulario:', this.theFormGroup.value);
    console.log('ID del seguro a actualizar:', this.seguro.id);

    // Obtener valores del formulario
    const formData = this.theFormGroup.value;
    const seguroData = {
      id: this.seguro.id, // Asegurar que el ID esté presente
      nombre: formData.nombre,
      descripcion: formData.descripcion
    };

    // Verificar que el ID no sea undefined, null o 0
    if (!seguroData.id || seguroData.id === 0) {
      console.error('Error: ID del seguro no válido:', seguroData.id);
      Swal.fire('Error', 'No se puede actualizar: ID no válido.', 'error');
      return;
    }

    console.log('Payload final enviado al backend:', seguroData);

    this.someSeguro.update(seguroData).subscribe({
      next: (seguro) => {
        console.log('Seguro actualizado exitosamente:', seguro);
        Swal.fire({
          title: '¡Actualizado!',
          text: 'Registro actualizado correctamente.',
          icon: 'success',
        }).then(() => {
          this.router.navigate(['/seguros/list']);
        });
      },
      error: (error) => {
        console.error('Error al actualizar seguro:', error);
        console.error('Respuesta completa del servidor:', error);
        if (error.error && error.error.message) {
          console.error('Mensaje del servidor:', error.error.message);
        }

        // Mostrar error específico del servidor
        let errorMessage = 'No se pudo actualizar el seguro.';
        if (error.error && error.error.message) {
          errorMessage = error.error.message;
        }

        Swal.fire('Error', errorMessage, 'error');
      }
    });
  }
  delete(id: number) {
    console.log("Delete seguro with id:", id);
    Swal.fire({
      title: 'Eliminar',
      text: "¿Está seguro que quiere eliminar el registro?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.someSeguro.delete(id).
          subscribe(data => {
            Swal.fire(
              'Eliminado!',
              'Registro eliminado correctamente.',
              'success'
            );
            this.ngOnInit();
          });
      }
    });
  }

  configFormGroup(): FormGroup {
    return this.theFormBuilder.group({
      id: [{ value: 0, disabled: true }], // Incluye el ID en el FormGroup
      nombre: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      descripcion: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(255)]],
    });
  }

  get getTheFormGroup() {
    return this.theFormGroup.controls;
  }
}