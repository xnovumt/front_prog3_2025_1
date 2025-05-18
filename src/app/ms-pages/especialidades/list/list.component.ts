// specialities/list/list.component.ts
import { Component, OnInit } from '@angular/core';
import { Especialidad } from 'src/app/models/especialidad.model';
import { EspecialidadesService } from 'src/app/services/especialidadesService/especialidades.service';
// import { Router } from '@angular/router'; // Import Router if you need navigation

@Component({
  selector: 'app-list-especialidad',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListSpecialityComponent implements OnInit {

  especialidades: Especialidad[] = []; // Array to store specialities

  // Inject the service and Router (if needed)
  constructor(private especialidadesService: EspecialidadesService /*, private router: Router*/) { }

  ngOnInit(): void {
    // Call the service to get the list
    this.especialidadesService.list().subscribe(data => {
      this.especialidades = data; // Assign data to the array property
    });
  }

  // Methods for edit and delete (adjust ID type based on your model)
  edit(id: number) {
    console.log('Editing Speciality ID:', id);
    // Implement navigation
  }

  delete(id: number) {
    console.log('Deleting Speciality ID:', id);
    // Implement call to the delete service method
  }
}