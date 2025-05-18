// machineryspeciality/list/list.component.ts
import { Component, OnInit } from '@angular/core';
import { EspecialidadMaquinaria } from 'src/app/models/especialidad-maquinaria.model';
import { EspecialidadMaquinariaService } from 'src/app/services/especialidadMaquinariaService/especialidad-maquina.service';
// import { Router } from '@angular/router'; // Import Router if you need navigation

@Component({
  selector: 'app-list-machinery-speciality',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListEspecialidadMaquinariaComponent implements OnInit {

  especialidadesmaquinaria: EspecialidadMaquinaria[] = []; // Array to store machinery-speciality links

  // Inject the especialidadMaquinariaService and Router (if needed)
  constructor(private EspecialidadMaquinariaService: EspecialidadMaquinariaService /*, private router: Router*/) { }

  ngOnInit(): void {
    // Call the service to get the list of links
    this.EspecialidadMaquinariaService.list().subscribe(data => {
      this.especialidadesmaquinaria = data; // Assign data to the machinerySpecialities array
    });
  }

  // Methods for edit and delete (adjust ID type based on your especialidadMaquinaria model)
  edit(id: number) {
    console.log('Editing Machinery-Speciality Link ID:', id);
    // Implement navigation, e.g: this.router.navigate(['/admin/especialidadMaquinaria/edit', id]);
  }

  delete(id: number) {
    console.log('Deleting Machinery-Speciality Link ID:', id);
    // Implement the call to the delete service method, e.g:
    // this.especialidadMaquinariaService.delete(id).subscribe(() => {
    //   console.log('Machinery-Speciality Link deleted successfully');
    //   this.ngOnInit(); // Reload the list
    // });
  }
}