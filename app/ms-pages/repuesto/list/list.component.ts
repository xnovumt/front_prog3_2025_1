import { Component, OnInit } from '@angular/core';
import { Repuesto } from 'src/app/models/repuesto.model'; // Importa el modelo Repuesto
import { RepuestoService } from 'src/app/services/repuestoService/repuesto.service'; // Importa el servicio RepuestoService
// import { Router } from '@angular/router'; // Importa Router si necesitas navegación

@Component({
  selector: 'app-list-Repuesto',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListRepuestoComponent implements OnInit {

  repuestos: Repuesto[] = []; // Arreglo para almacenar repuestos, tipado con el modelo Repuesto

  // Inyecta el servicio RepuestoService y Router (si lo necesitas)
  constructor(private RepuestoService: RepuestoService /*, private router: Router*/) { }

  ngOnInit(): void {
    // Llama al servicio para obtener la lista de repuestos
    this.RepuestoService.list().subscribe(data => {
      this.repuestos = data; // Asigna los datos a la propiedad Repuestos
    });
  }

  // Métodos para editar y eliminar (ajusta el tipo de ID según tu modelo Repuesto)
  edit(id: number) {
    console.log('Editando Repuesto ID:', id);
    // Implementa navegación, ej: this.router.navigate(['/admin/Repuesto/edit', id]);
  }

  delete(id: number) {
    console.log('Eliminando Repuesto ID:', id);
    // Implementa la llamada al servicio delete, ej:
    // this.RepuestoService.delete(id).subscribe(() => {
    //   console.log('Repuesto eliminado con éxito');
    //   this.ngOnInit(); // Recarga la lista
    // });
  }
}