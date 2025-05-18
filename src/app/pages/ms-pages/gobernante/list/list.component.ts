// ruler/list/list.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Gobernante } from 'src/app/models/gobernante.model';
import { GobernanteService } from 'src/app/services/gobernanteService/gobernante.service';
import Swal from 'sweetalert2';
// import { Router } from '@angular/router'; // Import Router if you need navigation

@Component({
  selector: 'app-list-gobernante',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListGobernanteComponent implements OnInit {

  gobernantes: Gobernante[] = []; // Array to store Gobernantes

  // Inject the service and Router (if needed)
  constructor(private GobernanteService: GobernanteService , private router: Router) { }

  ngOnInit(): void {
    // Call the service to get the list
    this.GobernanteService.list().subscribe(data => {
      this.gobernantes = data; // Assign data to the array property
    });
  }

  // Methods for edit and delete (adjust ID type based on your model)
  edit(id: number) {
    this.router.navigate(['gobernantes/update', id])
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
            this.GobernanteService.delete(id).
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