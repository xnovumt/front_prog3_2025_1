import { Component, OnInit } from '@angular/core';
import { Cuotas } from 'src/app/models/cuotas.model'; // Importa el modelo Quota
import { CuotasService } from 'src/app/services/cuotasService/cuotas.service'; // Importa el servicio CuotasService
// import { Router } from '@angular/router'; // Importa Router si necesitas navegación

@Component({
  selector: 'app-list-quota',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListQuotaComponent implements OnInit {

  cuotas: Cuotas[] = []; // Arreglo para almacenar cuotas, tipado con el modelo Quota

  // Inyecta el servicio QuotasService y Router (si lo necesitas)
  constructor(private cuotasService: CuotasService /*, private router: Router*/) { }

  ngOnInit(): void {
    // Llama al servicio para obtener la lista de cuotas
    this.cuotasService.list().subscribe(data => {
      this.cuotas = data; // Asigna los datos a la propiedad quotas
    });
  }

  // Métodos para editar y eliminar (ajusta el tipo de ID según tu modelo Quota)
  edit(id: number) {
    console.log('Editando Cuota ID:', id);
    // Implementa navegación, ej: this.router.navigate(['/admin/quotas/edit', id]);
  }

  delete(id: number) {
    console.log('Eliminando Cuota ID:', id);
    // Implementa la llamada al servicio delete, ej:
    // this.quotasService.delete(id).subscribe(() => {
    //   console.log('Cuota eliminada con éxito');
    //   this.ngOnInit(); // Recarga la lista
    // });
  }
}