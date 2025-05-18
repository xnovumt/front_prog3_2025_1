// machineryspeciality/list/list.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EspecialidadMaquinaria } from 'src/app/models/especialidad-maquinaria.model';
import { EspecialidadMaquinariaService } from 'src/app/services/especialidadMaquinariaService/especialidad-maquina.service';
import Swal from 'sweetalert2';
// import { Router } from '@angular/router'; // Import Router if you need navigation

@Component({
  selector: 'app-list-machinery-speciality',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListEspecialidadMaquinariaComponent implements OnInit {

  especialidadesmaquinaria: EspecialidadMaquinaria[] = []; // Array to store machinery-speciality links

  // Inject the especialidadMaquinariaService and Router (if needed)
  constructor(private EspecialidadMaquinariaService: EspecialidadMaquinariaService , private router: Router) { }

  ngOnInit(): void {
    // Call the service to get the list of links
    this.EspecialidadMaquinariaService.list().subscribe(data => {
      this.especialidadesmaquinaria = data; // Assign data to the machinerySpecialities array
    });
  }

  // Methods for edit and delete (adjust ID type based on your especialidadMaquinaria model)
  edit(id: number) {
    this.router.navigate(['especialidad-maquinaria/update', id])
    // Implement navigation, e.g: this.router.navigate(['/admin/especialidadMaquinaria/edit', id]);
  }

  delete(id: number) {
  console.log("Delete factura with id:", id);
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
            this.EspecialidadMaquinariaService.delete(id).
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
}