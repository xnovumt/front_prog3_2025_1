import { Component, OnInit } from '@angular/core';
import { ProcedimientoMantenimiento } from 'src/app/models/procedimiento-mantenimiento.model'; // Importa el modelo ProcedimientoMantenimiento
import { ProcedimientoMantenimientoService } from 'src/app/services/procedimientoMantenimientoService/procedimiento-mantenimiento.service'; // Importa el servicio ProcedimientoMantenimientoService
// import { Router } from '@angular/router'; // Importa Router si necesitas navegación

@Component({
  selector: 'app-list-procedimiento-mantenimiento',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListProcedimientoMantenimientoComponent implements OnInit {

  procedimientomantenimientos: ProcedimientoMantenimiento[] = []; // Arreglo para almacenar vínculos, tipado con el modelo ProcedimientoMantenimiento

  // Inyecta el servicio ProcedimientoMantenimientoService y Router (si lo necesitas)
  constructor(private ProcedimientoMantenimientoService: ProcedimientoMantenimientoService /*, private router: Router*/) { }

  ngOnInit(): void {
    // Llama al servicio para obtener la lista de vínculos
    this.ProcedimientoMantenimientoService.list().subscribe(data => {
      this.procedimientomantenimientos = data; // Asigna los datos a la propiedad ProcedimientoMantenimientos
    });
  }

  // Métodos para editar y eliminar (ajusta el tipo de ID según tu modelo ProcedimientoMantenimiento)
  edit(id: number) {
    console.log('Editando Vínculo Procedimiento-Mantenimiento ID:', id);
    // Implementa navegación, ej: this.router.navigate(['/admin/ProcedimientoMantenimiento/edit', id]);
  }

  delete(id: number) {
    console.log('Eliminando Vínculo Procedimiento-Mantenimiento ID:', id);
    // Implementa la llamada al servicio delete, ej:
    // this.ProcedimientoMantenimientoService.delete(id).subscribe(() => {
    //   console.log('Vínculo eliminado con éxito');
    //   this.ngOnInit(); // Recarga la lista
    // });
  }
}