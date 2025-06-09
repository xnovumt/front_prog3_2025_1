import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ObraMunicipio } from 'src/app/models/obra-municipio.model';
import { Obra } from 'src/app/models/obra.model';
import { Municipio } from 'src/app/models/municipio.model';
import { ObraMunicipioService } from 'src/app/services/obraMunicipioService/obra-municipio.service';
import { ObraService } from 'src/app/services/obraService/obra.service';
import { MunicipioService } from 'src/app/services/municipioService/municipio.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {

  mode: number; //1->View, 2->Create, 3-> Update
  obramunicipio: ObraMunicipio;
  
  // Arrays para los selectores
  obras: Obra[] = [];
  municipios: Municipio[] = [];

  constructor(
    private activateRoute: ActivatedRoute,
    private someObraMunicipio: ObraMunicipioService,
    private obraService: ObraService,
    private municipioService: MunicipioService,
    private router: Router
  ) {
    this.obramunicipio = { 
      id: 0,
      obra_id: undefined,
      municipio_id: undefined
    };
  }

  ngOnInit(): void {
    const currentUrl = this.activateRoute.snapshot.url.join('/');
    if (currentUrl.includes('view')) {
      this.mode = 1;
    } else if (currentUrl.includes('create')) {
      this.mode = 2;
    } else if (currentUrl.includes('update')) {
      this.mode = 3;
    }

    // Cargar listas para los selectores
    this.loadObras();
    this.loadMunicipios();

    if (this.activateRoute.snapshot.params.id) {
      this.obramunicipio.id = this.activateRoute.snapshot.params.id;
      this.getObraMunicipio(this.obramunicipio.id);
    }
  }

  // Método para cargar obras
  loadObras() {
    this.obraService.list().subscribe({
      next: (response: any) => {
        // Verificar si la respuesta tiene la estructura { data: Obra[] }
        if (response && response.data && Array.isArray(response.data)) {
          this.obras = response.data;
        } else if (Array.isArray(response)) {
          // Si la respuesta es directamente un array
          this.obras = response;
        } else {
          console.error('Estructura de respuesta inesperada para obras:', response);
          this.obras = [];
        }
        console.log('Obras cargadas:', this.obras);
      },
      error: (error) => {
        console.error('Error cargando obras:', error);
        this.obras = [];
      }
    });
  }

  // Método para cargar municipios
  loadMunicipios() {
    this.municipioService.list().subscribe({
      next: (response: any) => {
        // Verificar si la respuesta tiene la estructura { data: Municipio[] }
        if (response && response.data && Array.isArray(response.data)) {
          this.municipios = response.data;
        } else if (Array.isArray(response)) {
          // Si la respuesta es directamente un array
          this.municipios = response;
        } else {
          console.error('Estructura de respuesta inesperada para municipios:', response);
          this.municipios = [];
        }
        console.log('Municipios cargados:', this.municipios);
      },
      error: (error) => {
        console.error('Error cargando municipios:', error);
        this.municipios = [];
      }
    });
  }

  getObraMunicipio(id: number) {
    this.someObraMunicipio.view(id).subscribe({
      next: (obramunicipio) => {
        this.obramunicipio = obramunicipio;
        console.log('ObraMunicipio obtenido exitosamente:', this.obramunicipio);
      },
      error: (error) => {
        console.error('Error al obtener obramunicipio:', error);
        Swal.fire('Error', 'No se pudo obtener el registro.', 'error');
      }
    });
  }

  back() {
    this.router.navigate(['obra-municipios/list']); // Usar ruta consistente
  }

  create() {
    if (!this.validateObraMunicipio()) {
      Swal.fire('Error', 'Por favor, complete todos los campos obligatorios.', 'error');
      return;
    }

    console.log('Payload enviado al backend:', this.obramunicipio);
    this.someObraMunicipio.create(this.obramunicipio).subscribe({
      next: (obramunicipio) => {
        console.log('ObraMunicipio creado exitosamente:', obramunicipio);
        Swal.fire({
          title: '¡Creado!',
          text: 'Registro creado correctamente.',
          icon: 'success',
        }).then(() => {
          this.router.navigate(['/obra-municipios/list']); // Ruta consistente
        });
      },
      error: (error) => {
        console.error('Error al crear obramunicipio:', error);
        Swal.fire('Error', 'No se pudo crear el registro.', 'error');
      }
    });
  }

  update() {
    if (!this.validateObraMunicipio()) {
      Swal.fire('Error', 'Por favor, complete todos los campos obligatorios.', 'error');
      return;
    }

    this.someObraMunicipio.update(this.obramunicipio).subscribe({
      next: (obramunicipio) => {
        console.log('ObraMunicipio actualizado exitosamente:', obramunicipio);
        Swal.fire({
          title: '¡Actualizado!',
          text: 'Registro actualizado correctamente.',
          icon: 'success',
        }).then(() => {
          this.router.navigate(['/obra-municipios/list']); // Ruta consistente
        });
      },
      error: (error) => {
        console.error('Error al actualizar obramunicipio:', error);
        Swal.fire('Error', 'No se pudo actualizar el registro.', 'error');
      }
    });
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
        this.someObraMunicipio.delete(id).subscribe({
          next: () => {
            Swal.fire('¡Eliminado!', 'Registro eliminado correctamente.', 'success');
            this.router.navigate(['/obra-municipios/list']); // Ruta consistente
          },
          error: (error) => {
            console.error('Error al eliminar obramunicipio:', error);
            Swal.fire('Error', 'No se pudo eliminar el registro.', 'error');
          }
        });
      }
    });
  }

  // Validación
  private validateObraMunicipio(): boolean {
    return !!this.obramunicipio.obra_id && 
           !!this.obramunicipio.municipio_id;
  }
}
