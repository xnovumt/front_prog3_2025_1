// departmentruler/list/list.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GobernanteDepartamento } from 'src/app/models/gobernante-departamento.model';
import { GobernanteDepartamentoService } from 'src/app/services/gobernanteDepartamentoService/gobernante-departamento.service';
import Swal from 'sweetalert2';
// import { Router } from '@angular/router'; // Import Router if you need navigation

@Component({
  selector: 'app-list-department-ruler',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListGobernanteDepartamentoComponent implements OnInit {

  gobernanteDepartamentos: GobernanteDepartamento[] = []; // Array to store department-ruler links

  // Inject the GobernanteDepartamentoService and Router (if needed)
  constructor(private GobernanteDepartamentoService: GobernanteDepartamentoService , private router: Router) { }

  ngOnInit(): void {
    // Call the service to get the list of links
    this.GobernanteDepartamentoService.list().subscribe(data => {
      this.gobernanteDepartamentos = data; // Assign data to the GobernanteDepartamentos array
    });
  }

  // Methods for edit and delete (adjust ID type based on your GobernanteDepartamento model)
  edit(id: number) {
    this.router.navigate(['gobernante-departamento/update', id])
    // Implement navigation, e.g: this.router.navigate(['/admin/GobernanteDepartamento/edit', id]);
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
            this.GobernanteDepartamentoService.delete(id).
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