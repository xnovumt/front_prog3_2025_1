import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Evidencia } from 'src/app/models/evidencia.model'; // Importa el modelo Evidence
import { EvidenciaService } from 'src/app/services/evidenciaService/evidencia.service'; // Importa el servicio EvidenceService
import Swal from 'sweetalert2';
// import { Router } from '@angular/router'; // Importa Router si necesitas navegación

@Component({
  selector: 'app-list-evidencia',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListEvidenciaComponent implements OnInit {

  evidencias: Evidencia[] = []; // Arreglo para almacenar evidencias, tipado con el modelo Evidence

  // Inyecta el servicio EvidenceService y Router (si lo necesitas)
  constructor(private EvidenciaService: EvidenciaService , private router: Router) { }

  ngOnInit(): void {
    // Llama al servicio para obtener la lista de evidencias
    this.EvidenciaService.list().subscribe(data => {
      this.evidencias = data; // Asigna los datos a la propiedad evidences
    });
  }

  // Métodos para editar y eliminar (ajusta el tipo de ID según tu modelo Evidence)
  edit(id: number) {
    this.router.navigate(['evidencia/update', id])
    // Implementa navegación, ej: this.router.navigate(['/admin/evidence/edit', id]);
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
            this.EvidenciaService.delete(id).
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