// service/list/list.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Servicio } from 'src/app/models/servicio.model';
import { ServicioService } from 'src/app/services/servicioService/servicio.service';
// import { Router } from '@angular/router'; // Import Router if you need navigation

@Component({
  selector: 'app-list-service',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListServicioComponent implements OnInit {

  servicios: Servicio[]; // Array to store servicios

  // Inject the service and Router (if needed)
  constructor(private servicioService: ServicioService, private router: Router) { }

  ngOnInit(): void {
    console.log('Componente ListServiceComponent inicializado'); // <-- Opcional: confirma que ngOnInit se ejecuta
    this.servicioService.list().subscribe(
      data => {
        console.log('Datos recibidos del servicio (subscribe):', data); // <-- Añade este log
        this.servicios = data; // Asigna los datos
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
    this.router.navigate(['/servicio/update', id])
    // Implement navigation
  }

  delete(id: number) {
    console.log('Deleting Service ID:', id);
    // Implement call to the delete service method
  }
  view(id: number) {
    this.router.navigate(['/servicio/list'])
  }
}