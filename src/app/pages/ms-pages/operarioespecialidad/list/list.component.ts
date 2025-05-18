import { Component, OnInit } from '@angular/core';
import { OperarioEspecialidad } from 'src/app/models/operario-especialidad.model'; // Importa el modelo OperarioEspecialidad
import { OperarioEspecialidadService } from 'src/app/services/operarioEspecialidadService/operario-especialidad.service'; // Importa el servicio OperarioEspecialidadService
// import { Router } from '@angular/router'; // Importa Router si necesitas navegación

@Component({
  selector: 'app-list-operario-especialidad',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListOperarioEspecialidadComponent implements OnInit {

  OperarioEspecialidads: OperarioEspecialidad[] = []; // Arreglo para almacenar vínculos, tipado con el modelo OperarioEspecialidad

  // Inyecta el servicio OperarioEspecialidadService y Router (si lo necesitas)
  constructor(private OperarioEspecialidadService: OperarioEspecialidadService /*, private router: Router*/) { }

  ngOnInit(): void {
    // Llama al servicio para obtener la lista de vínculos
    this.OperarioEspecialidadService.list().subscribe(data => {
      this.OperarioEspecialidads = data; // Asigna los datos a la propiedad OperarioEspecialidads
    });
  }

  // Métodos para editar y eliminar (ajusta el tipo de ID según tu modelo OperarioEspecialidad)
  edit(id: number) {
    console.log('Editando Vínculo Especialidad-Operario ID:', id);
    // Implementa navegación, ej: this.router.navigate(['/admin/OperarioEspecialidad/edit', id]);
  }

  delete(id: number) {
    console.log('Eliminando Vínculo Especialidad-Operario ID:', id);
    // Implementa la llamada al servicio delete, ej:
    // this.OperarioEspecialidadService.delete(id).subscribe(() => {
    //   console.log('Vínculo eliminado con éxito');
    //   this.ngOnInit(); // Recarga la lista
    // });
  }
}