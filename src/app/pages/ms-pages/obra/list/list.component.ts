// construction/list/list.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Obra } from 'src/app/models/obra.model';
import { ObraService } from 'src/app/services/obraService/obra.service';
import Swal from 'sweetalert2';
// import { Router } from '@angular/router'; // Import Router if you need navigation

@Component({
  selector: 'app-list-obra',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListObraComponent implements OnInit {

  obras: Obra[] = []; // Array to store Obras

  // Inject the ObraService and Router (if needed)
  constructor(private ObraService: ObraService, private router: Router) { }

  ngOnInit(): void {
    // Call the service to get the list of Obras
    this.ObraService.list().subscribe(data => {
      this.obras = data; // Assign data to the Obras array
    });
  }

  // Methods for edit and delete (adjust ID type based on your Obra model)
  edit(id: number) {
    this.router.navigate(['obra/update', id])
    // Implement navigation, e.g: this.router.navigate(['/admin/Obra/edit', id]);
  }

  delete(id: number) {
    console.log("Delete seguro with id:", id);
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
        this.ObraService.delete(id).
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
  navigateToCreate() {
    this.router.navigate(['/obra/create']).then(
      success => {
        if (success) {
          Swal.fire({
            icon: 'success',
            title: 'Redirigido',
            text: 'Navegación exitosa al formulario de creación.'
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se pudo navegar al formulario de creación.'
          });
        }
      },
      error => {
        console.error('Error al navegar:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Ocurrió un error al intentar navegar al formulario de creación.'
        });
      }
    );
  }
}