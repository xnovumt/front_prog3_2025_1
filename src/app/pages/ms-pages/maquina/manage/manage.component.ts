import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GPS } from 'src/app/models/gps.model';
import { Maquina } from 'src/app/models/maquina.model';
import { GPSService } from 'src/app/services/gpsService/gps.service';
import { MaquinaService } from 'src/app/services/maquinaService/maquina.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {

  mode: number; //1->View, 2->Create, 3-> Update
  maquina: Maquina;
  theFormGroup: FormGroup; // Form Police
  trySend: boolean;
  GPS: GPS[];

  constructor(private activateRoute: ActivatedRoute,
    private someMaquina: MaquinaService,
    private router: Router,
    private theFormBuilder: FormBuilder,
    private gpsService: GPSService,
  ) {
    this.GPS = [];
    this.maquina = {
      id: 0,

    };
    this.trySend = false;
    this.theFormGroup = this.configFormGroup();
  }

  loadGpsList() {
    this.gpsService.list().subscribe(data => {
      this.GPS = data;
    });
  }

  ngOnInit(): void {
    const currentUrl = this.activateRoute.snapshot.url.join('/');
    if (currentUrl.includes('view')) {
      this.mode = 1;
      this.theFormGroup.disable(); // Deshabilitar el formulario en modo vista
      this.loadGpsList(); // Cargar la lista de GPS también en modo vista (por si acaso)
    } else if (currentUrl.includes('create')) {
      this.mode = 2;
      this.loadGpsList(); // Cargar la lista de GPS cuando se entra en el modo de creación
      this.theFormGroup.reset({ id: { value: 0, disabled: true } });
    } else if (currentUrl.includes('update')) {
      this.mode = 3;
      this.loadGpsList(); // Cargar la lista de GPS también en modo actualización
    }
    if (this.activateRoute.snapshot.params.id) {
      this.maquina.id = this.activateRoute.snapshot.params.id;
      this.getMaquina(this.maquina.id);
    }
  }
  getMaquina(id: number) {
    this.someMaquina.view(id).subscribe({
      next: (maquina) => {
        this.maquina = maquina;
        this.theFormGroup.patchValue(maquina); // Llenar el formulario con los datos
        console.log('maquina fetched successfully:', this.maquina);
      },
      error: (error) => {
        console.error('Error fetching maquina:', error);
      }
    });
  }
  back() {
    this.router.navigate(['maquinas/list']);
  }
  create() {
    this.trySend = true;
    if (this.theFormGroup.valid) {
      const newMaquina = this.theFormGroup.value as Maquina; // Obtener los valores del formulario
      newMaquina.id = undefined; // Dejar que el backend genere el ID// Asegurar que gps sea un objeto con id

      console.log('Payload enviado al backend:', newMaquina);
      this.someMaquina.create(newMaquina).subscribe({
        next: (maquina) => {
          console.log('maquina created successfully:', maquina);
          Swal.fire({
            title: 'Creado!',
            text: 'Registro creado correctamente.',
            icon: 'success',
          }).then(() => {
            this.router.navigate(['/maquinas/list']);
          });
        },
        error: (error) => {
          console.error('Error creating maquina:', error);
          if (error.status === 422) {
            console.error('Errores de validación:', error.error.errors);
          }
        }
      });
    }
  }
  update() {
    this.trySend = true;
    if (this.theFormGroup.valid) {
      const updatedMaquina = this.theFormGroup.value as Maquina;
      updatedMaquina.id = this.maquina.id; // Mantener el ID existente

      this.someMaquina.update(updatedMaquina).subscribe({
        next: (maquina) => {
          console.log('maquina updated successfully:', maquina);
          Swal.fire({
            title: 'Actualizado!',
            text: 'Registro actualizado correctamente.',
            icon: 'success',
          }).then(() => {
            this.router.navigate(['/maquinas/list']);
          });
        },
        error: (error) => {
          console.error('Error updating maquina:', error);
        }
      });
    }
  }
  delete(id: number) {
    console.log("Delete maquina with id:", id);
    Swal.fire({
      title: 'Eliminar',
      text: "¿Está maquina que quiere eliminar el registro?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.someMaquina.delete(id).
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
      id: [{ value: 0, disabled: true }], // Inicializa y deshabilita el campo 'id'
      especialidad: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      marca: ['', Validators.required],
      modelo: ['', Validators.required],
      estado: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(255)]],
      ubicacion: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(255)]],
      disponibilidad: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(255)]],
      fecha_asignacion: ['', Validators.required], // Added Validators.required
      fecha_retiro: ['', Validators.required],// Added Validators.required
      gps: ['', Validators.required] // Added Validators.required
    });
  }

}