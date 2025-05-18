// service/list/list.component.ts
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Servicio } from 'src/app/models/servicio.model';
import { ServicioService } from 'src/app/services/servicioService/servicio.service';
import Swal from 'sweetalert2'; // Asegúrate de que la ruta de importación es correcta

@Component({
  selector: 'app-list-service',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListServicioComponent implements OnInit {

  servicios: Servicio[];
  theFormGroup: FormGroup; // Form Police
  trySend: boolean // Array to store servicios

  // Inject the service and Router (if needed)
  constructor(
    private servicioService: ServicioService, 
    private router: Router,
    private theFormBuilder: FormBuilder,
    private cdr: ChangeDetectorRef
  
  ) {
    this.configFormGroup();
    this.trySend = false
   }

  ngOnInit(): void {
    console.log('Componente ListServiceComponent inicializado'); // <-- Opcional: confirma que ngOnInit se ejecuta
    this.servicioService.list().subscribe(
      data => {
        console.log('Datos recibidos del servicio (subscribe):', data); // <-- Añade este log
        this.servicios = data; // Asigna los datos
        this.cdr.detectChanges(); // Forzar la detección de cambios
        console.log('Variable servicios del componente después de asignar:', this.servicios); // <-- Añade este log
      },
      error => {
        console.error('Error en la suscripción del servicio:', error); // <-- Añade log de error por si acaso
      }
    );
    console.log('Llamada a serviceService.list().subscribe() completada en ngOnInit'); // <-- Opcional
  }

  // Methods for edit and delete (adjust ID type based on your model)
  edit(id: number) {
    if (isNaN(id)) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'El ID proporcionado no es válido.'
      });
      return;
    }

    this.router.navigate(['/servicio/update', id]).then(
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

  delete(id: number) {
    if (confirm('¿Estás seguro de que deseas eliminar este servicio?')) {
      this.servicioService.delete(id).subscribe(
        () => {
          alert('Servicio eliminado con éxito.');
          this.servicios = this.servicios.filter(servicio => servicio.id !== id);
        },
        error => {
          console.error('Error al eliminar el servicio:', error);
          alert('Hubo un error al intentar eliminar el servicio.');
        }
      );
    }
  }
  get getTheFormGroup() {
    return this.theFormGroup.controls
  }
  configFormGroup() {
    this.theFormGroup = this.theFormBuilder.group({
      // primer elemento del vector, valor por defecto
      // lista, serán las reglas
      priority: [0, [Validators.required, Validators.min(1), Validators.max(100)]],
      location: ['', [Validators.required, Validators.minLength(2)]]
    })
  }
  view(id: number) {
    this.router.navigate(['/servicio/list', id])
  }
}