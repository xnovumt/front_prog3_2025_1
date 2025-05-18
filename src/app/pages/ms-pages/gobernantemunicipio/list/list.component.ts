// municipalityruler/list/list.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GobernanteMunicipio } from 'src/app/models/gobernante-municipio.model';
import { GobernanteMunicipioService } from 'src/app/services/gobernanteMunicipioService/gobernante-municipio.service';
import Swal from 'sweetalert2';
// import { Router } from '@angular/router'; // Import Router if you need navigation

@Component({
  selector: 'app-list-municipality-ruler',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListGobernanteMunicipioComponent implements OnInit {

  gobernanteMunicipios: GobernanteMunicipio[] = []; // Array to store links

  // Inject the service and Router (if needed)
  constructor(private GobernanteMunicipioService: GobernanteMunicipioService , private router: Router) { }

  ngOnInit(): void {
    // Call the service to get the list
    this.GobernanteMunicipioService.list().subscribe(data => {
      this.gobernanteMunicipios = data; // Assign data to the array property
    });
  }

  // Methods for edit and delete (adjust ID type based on your model)
  edit(id: number) {
    this.router.navigate(['gobernante-municipio/update', id])
    // Implement navigation
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
            this.GobernanteMunicipioService.delete(id).
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