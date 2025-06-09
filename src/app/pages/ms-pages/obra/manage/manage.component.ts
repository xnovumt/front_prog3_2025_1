import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Obra } from 'src/app/models/obra.model';
import { Combo } from 'src/app/models/combo.model';
import { ObraService } from 'src/app/services/obraService/obra.service';
import { CombosService } from 'src/app/services/comboService/combos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {

  mode: number; //1->View, 2->Create, 3-> Update
  obra: Obra;

  // Array para el selector de combos
  combos: Combo[] = [];

  constructor(
    private activateRoute: ActivatedRoute,
    private someObra: ObraService,
    private combosService: CombosService,
    private router: Router
  ) {
    this.obra = {
      id: 0,
      nombre: '',
      combo_id: undefined
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

    // Cargar combos para el selector
    this.loadCombos();

    if (this.activateRoute.snapshot.params.id) {
      this.obra.id = this.activateRoute.snapshot.params.id;
      this.getObra(this.obra.id);
    }
  }

  // Método para cargar combos
  loadCombos() {
    this.combosService.list().subscribe({
      next: (data) => {
        this.combos = data;
        console.log('Combos cargados:', this.combos);
      },
      error: (error) => {
        console.error('Error cargando combos:', error);
      }
    });
  }

  getObra(id: number) {
    this.someObra.view(id).subscribe({
      next: (obra) => {
        this.obra = obra;
        console.log('Obra obtenida exitosamente:', this.obra);
        // Los municipios vienen automáticamente del backend, pero los ignoramos
        console.log('Municipios incluidos automáticamente:', this.obra.municipios);
      },
      error: (error) => {
        console.error('Error al obtener obra:', error);
        Swal.fire('Error', 'No se pudo obtener la obra.', 'error');
      }
    });
  }

  back() {
    this.router.navigate(['obra/list']);
  }

  create() {
    if (!this.validateObra()) {
      Swal.fire('Error', 'Por favor, complete todos los campos obligatorios.', 'error');
      return;
    }

    // Solo enviamos nombre y combo_id
    const obraData = {
      nombre: this.obra.nombre,
      combo_id: this.obra.combo_id
    };

    console.log('Payload enviado al backend:', obraData);
    this.someObra.create(obraData).subscribe({
      next: (obra) => {
        console.log('Obra creada exitosamente:', obra);
        // La respuesta incluirá municipios: [] automáticamente
        Swal.fire({
          title: '¡Creado!',
          text: 'Registro creado correctamente.',
          icon: 'success',
        }).then(() => {
          this.router.navigate(['/obra/list']);
        });
      },
      error: (error) => {
        console.error('Error al crear obra:', error);
        Swal.fire('Error', 'No se pudo crear la obra.', 'error');
      }
    });
  }

  update() {
    if (!this.validateObra()) {
      Swal.fire('Error', 'Por favor, complete todos los campos obligatorios.', 'error');
      return;
    }

    // Solo enviamos los campos que queremos actualizar
    const obraData = {
      id: this.obra.id,
      nombre: this.obra.nombre,
      combo_id: this.obra.combo_id
    };

    this.someObra.update(obraData).subscribe({
      next: (obra) => {
        console.log('Obra actualizada exitosamente:', obra);
        Swal.fire({
          title: '¡Actualizado!',
          text: 'Registro actualizado correctamente.',
          icon: 'success',
        }).then(() => {
          this.router.navigate(['/obra/list']);
        });
      },
      error: (error) => {
        console.error('Error al actualizar obra:', error);
        Swal.fire('Error', 'No se pudo actualizar la obra.', 'error');
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
        this.someObra.delete(id).subscribe({
          next: () => {
            Swal.fire('¡Eliminado!', 'Registro eliminado correctamente.', 'success');
            this.router.navigate(['/obra/list']);
          },
          error: (error) => {
            console.error('Error al eliminar obra:', error);
            Swal.fire('Error', 'No se pudo eliminar la obra.', 'error');
          }
        });
      }
    });
  }

  // Validación simple
  private validateObra(): boolean {
    return !!this.obra.nombre &&
      !!this.obra.combo_id;
  }
}
