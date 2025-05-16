import { Component, OnInit } from '@angular/core';
import { Poliza } from 'src/app/models/poliza.model'; // Importa el modelo Policy
import { PolizaService } from 'src/app/services/polizaService/poliza.service'; // Importa el servicio PolicyService
// import { Router } from '@angular/router'; // Importa Router si necesitas navegación

@Component({
  selector: 'app-list-policy',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListPolizaComponent implements OnInit {

  polizas: Poliza[] = []; // Cambié 'policies' a 'polizas' para reflejar el cambio al español

  // Inyecta el servicio PolicyService y Router (si lo necesitas)
  constructor(private polizaService: PolizaService /*, private router: Router*/) { }

  ngOnInit(): void {
    // Llama al servicio para obtener la lista de pólizas
    this.polizaService.list().subscribe(data => {
      this.polizas = data; // Asigna los datos a la propiedad polizas
    }, error => {
      console.error('Error al cargar las pólizas:', error);
      this.polizas = []; // Asegura que polizas esté inicializado incluso si hay un error
    });
  }

  // Métodos para editar y eliminar (ajusta el tipo de ID según tu modelo Policy)
  edit(id: number) {
    console.log('Editando Póliza ID:', id);
    // Implementa navegación, ej: this.router.navigate(['/admin/policy/edit', id]);
  }

  delete(id: number) {
    console.log('Eliminando Póliza ID:', id);
    // Implementa la llamada al servicio delete, ej:
    // this.policyService.delete(id).subscribe(() => {
    //   console.log('Póliza eliminada con éxito');
    //   this.ngOnInit(); // Recarga la lista
    // });
  }
}