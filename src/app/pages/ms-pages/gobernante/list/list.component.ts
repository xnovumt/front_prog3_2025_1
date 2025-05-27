// ruler/list/list.component.ts
import { Component, OnInit } from '@angular/core';
import { Gobernante } from 'src/app/models/gobernante.model';
import { GobernanteService } from 'src/app/services/gobernanteService/gobernante.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-gobernante',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListGobernanteComponent implements OnInit {

  gobernantes: Gobernante[] = []; // Array to store Gobernantes

  constructor(private GobernanteService: GobernanteService, private router: Router) { }

  ngOnInit(): void {
    this.GobernanteService.list().subscribe(data => {
      this.gobernantes = data; // Assign data to the array property
    });
  }

  edit(id: number) {
    if (isNaN(id)) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'El ID proporcionado no es válido.'
      });
      return;
    }

    this.router.navigate([`/gobernante/update`, id]).then(
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
    Swal.fire({
      title: 'Eliminar',
      text: '¿Está seguro que quiere eliminar el registro?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.GobernanteService.delete(id).subscribe({
          next: () => {
            Swal.fire('Eliminado!', 'Registro eliminado correctamente.', 'success');
            this.ngOnInit(); // Recargar la lista después de eliminar
          },
          error: (error) => {
            console.error('Error al eliminar el gobernante:', error);
            Swal.fire('Error', 'No se pudo eliminar el registro.', 'error');
          }
        });
      }
    });
  }

  navigateToCreate() {
    this.router.navigate(['/gobernante/create']).then(
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