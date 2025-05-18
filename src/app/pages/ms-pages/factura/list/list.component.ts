import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Factura } from 'src/app/models/factura.model'; // Cambié el modelo a Factura
import { FacturaService } from 'src/app/services/facturaService/factura.service'; // Cambié el servicio a FacturaService
import Swal from 'sweetalert2';
// import { Router } from '@angular/router'; // Importa Router si necesitas navegación

@Component({
  selector: 'app-list-factura', // Cambié el selector para reflejar el cambio a Factura
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListFacturaComponent implements OnInit { // Cambié el nombre de la clase a ListFacturaComponent

  facturas: Factura[] = []; // Cambié 'bills' a 'facturas' para reflejar el cambio al español

  // Inyecta el servicio BillService y Router (si lo necesitas)
  constructor(private facturaService: FacturaService , private router: Router) { }

  ngOnInit(): void {
    // Llama al servicio para obtener la lista de facturas
    this.facturaService.list().subscribe(data => {
      this.facturas = data; // Asigna los datos a la propiedad facturas
    });
  }

  // Métodos para editar y eliminar (ajusta el tipo de ID según tu modelo Bill)
  edit(id: number) {
    this.router.navigate(['factura/update', id])
    // Implementa navegación, ej: this.router.navigate(['/admin/factura/edit', id]);
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
            this.facturaService.delete(id).
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