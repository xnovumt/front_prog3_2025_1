import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProcedimientoMantenimiento } from 'src/app/models/procedimiento-mantenimiento.model';
import { ProcedimientoMantenimientoService } from 'src/app/services/procedimientoMantenimientoService/procedimiento-mantenimiento.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {

  mode: number; //1->View, 2->Create, 3-> Update
  procedimientomantenimiento: ProcedimientoMantenimiento;
  theFormGroup: FormGroup; // Form Police
    trySend: boolean

  constructor(private activateRoute: ActivatedRoute,
    private someProcedimientoMantenimiento: ProcedimientoMantenimientoService,
    private router: Router,
    private theFormBuilder: FormBuilder,
  ) {
    this.procedimientomantenimiento = { id: 0 };
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
      this.procedimientomantenimiento.id = this.activateRoute.snapshot.params.id
      this.getProcedimientoMantenimiento(this.procedimientomantenimiento.id)
    }
  }
  getProcedimientoMantenimiento(id: number) {
    this.someProcedimientoMantenimiento.view(id).subscribe({
      next: (procedimientomantenimiento) => {
        this.procedimientomantenimiento = procedimientomantenimiento;
        console.log('procedimientomantenimiento fetched successfully:', this.procedimientomantenimiento);
      },
      error: (error) => {
        console.error('Error fetching procedimientomantenimiento:', error);
      }
    });
  }
  back() {
    this.router.navigate(['procedimiento-mantenimiento/list'])
  }
  create() {
    this.trySend = true;
    this.someProcedimientoMantenimiento.create(this.procedimientomantenimiento).subscribe({
      next: (procedimientomantenimiento) => {
        console.log('procedimientomantenimiento created successfully:', procedimientomantenimiento);
        Swal.fire({
          title: 'Creado!',
          text: 'Registro creado correctamente.',
          icon: 'success',
        })
        this.router.navigate(['/procedimiento-mantenimiento/list']);
      },
      error: (error) => {
        console.error('Error creating procedimientomantenimiento:', error);
      }
    });
  }
  update() {
    this.someProcedimientoMantenimiento.update(this.procedimientomantenimiento).subscribe({
      next: (procedimientomantenimiento) => {
        console.log('procedimientomantenimiento updated successfully:', procedimientomantenimiento);
        Swal.fire({
          title: 'Actualizado!',
          text: 'Registro actualizado correctamente.',
          icon: 'success',
        })
        this.router.navigate(['/procedimiento-mantenimiento/list']);
      },
      error: (error) => {
        console.error('Error updating procedimientomantenimiento:', error);
      }
    });
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
        this.someProcedimientoMantenimiento.delete(id).
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
        id: [{ value: 0, disabled: true }], // Incluye el ID en el FormGroup
        procedimiento_id: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
        mantenimiento_id: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(255)]],
        estado: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(255)]],
      });
    }
  
    get getTheFormGroup() {
      return this.theFormGroup.controls;
    }
}
