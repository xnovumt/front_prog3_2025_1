import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MaquinaCombo } from 'src/app/models/maquina-combo.model';
import { Maquina } from 'src/app/models/maquina.model';
import { Combo } from 'src/app/models/combo.model';
import { MaquinaComboService } from 'src/app/services/maquinaComboService/maquina-combo.service';
import { MaquinaService } from 'src/app/services/maquinaService/maquina.service';
import { CombosService } from 'src/app/services/comboService/combos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {
  mode: number; //1->View, 2->Create, 3-> Update
  maquinacombo: MaquinaCombo;

  // Arrays para los selectores
  maquinas: Maquina[] = [];
  combos: Combo[] = [];

  constructor(
    private activateRoute: ActivatedRoute,
    private someMaquinaCombo: MaquinaComboService,
    private maquinaService: MaquinaService,
    private combosService: CombosService,
    private router: Router
  ) {
    this.maquinacombo = {
      id: 0,
      maquina_id: undefined,
      combo_id: undefined,
      fecha_inicio: undefined,
      fecha_fin: undefined
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
    this.loadMaquinas();
    this.loadCombos();

    if (this.activateRoute.snapshot.params.id) {
      this.maquinacombo.id = this.activateRoute.snapshot.params.id;
      this.getMaquinaCombo(this.maquinacombo.id);
    }
  }

  // Método para cargar máquinas
  loadMaquinas() {
    this.maquinaService.list().subscribe({
      next: (data) => {
        this.maquinas = data;
        console.log('Máquinas cargadas:', this.maquinas);
      },
      error: (error) => {
        console.error('Error cargando máquinas:', error);
      }
    });
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

  getMaquinaCombo(id: number) {
    this.someMaquinaCombo.view(id).subscribe({
      next: (maquinacombo) => {
        this.maquinacombo = maquinacombo;
        // Convertir fechas si vienen como string del backend
        if (this.maquinacombo.fecha_inicio && typeof this.maquinacombo.fecha_inicio === 'string') {
          this.maquinacombo.fecha_inicio = new Date(this.maquinacombo.fecha_inicio);
        }
        if (this.maquinacombo.fecha_fin && typeof this.maquinacombo.fecha_fin === 'string') {
          this.maquinacombo.fecha_fin = new Date(this.maquinacombo.fecha_fin);
        }
        console.log('MaquinaCombo obtenido exitosamente:', this.maquinacombo);
      },
      error: (error) => {
        console.error('Error al obtener maquinacombo:', error);
        Swal.fire('Error', 'No se pudo obtener el registro.', 'error');
      }
    });
  }

  back() {
    this.router.navigate(['maquina-combos/list']);
  }

  create() {
    if (!this.validateMaquinaCombo()) {
      Swal.fire('Error', 'Por favor, complete todos los campos obligatorios.', 'error');
      return;
    }

    console.log('Payload enviado al backend:', this.maquinacombo);
    this.someMaquinaCombo.create(this.maquinacombo).subscribe({
      next: (maquinacombo) => {
        console.log('MaquinaCombo creado exitosamente:', maquinacombo);
        Swal.fire({
          title: '¡Creado!',
          text: 'Registro creado correctamente.',
          icon: 'success',
        }).then(() => {
          this.router.navigate(['/maquina-combos/list']);
        });
      },
      error: (error) => {
        console.error('Error al crear maquinacombo:', error);
        Swal.fire('Error', 'No se pudo crear el registro.', 'error');
      }
    });
  }

  update() {
    if (!this.validateMaquinaCombo()) {
      Swal.fire('Error', 'Por favor, complete todos los campos obligatorios.', 'error');
      return;
    }

    this.someMaquinaCombo.update(this.maquinacombo).subscribe({
      next: (maquinacombo) => {
        console.log('MaquinaCombo actualizado exitosamente:', maquinacombo);
        Swal.fire({
          title: '¡Actualizado!',
          text: 'Registro actualizado correctamente.',
          icon: 'success',
        }).then(() => {
          this.router.navigate(['/maquina-combos/list']);
        });
      },
      error: (error) => {
        console.error('Error al actualizar maquinacombo:', error);
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
        this.someMaquinaCombo.delete(id).subscribe({
          next: () => {
            Swal.fire('¡Eliminado!', 'Registro eliminado correctamente.', 'success');
            this.router.navigate(['/maquina-combos/list']);
          },
          error: (error) => {
            console.error('Error al eliminar maquinacombo:', error);
            Swal.fire('Error', 'No se pudo eliminar el registro.', 'error');
          }
        });
      }
    });
  }

  // Validación
  private validateMaquinaCombo(): boolean {
    return !!this.maquinacombo.maquina_id &&
      !!this.maquinacombo.combo_id &&
      !!this.maquinacombo.fecha_inicio &&
      !!this.maquinacombo.fecha_fin;
  }

  // Métodos helper para formatear fechas para el input date
  getFormattedDateInicio(): string {
    if (!this.maquinacombo.fecha_inicio) return '';
    const date = new Date(this.maquinacombo.fecha_inicio);
    return date.toISOString().split('T')[0];
  }

  getFormattedDateFin(): string {
    if (!this.maquinacombo.fecha_fin) return '';
    const date = new Date(this.maquinacombo.fecha_fin);
    return date.toISOString().split('T')[0];
  }

  // Métodos para actualizar fechas cuando cambian los inputs
  onDateInicioChange(event: any): void {
    if (event.target.value) {
      this.maquinacombo.fecha_inicio = new Date(event.target.value);
    }
  }

  onDateFinChange(event: any): void {
    if (event.target.value) {
      this.maquinacombo.fecha_fin = new Date(event.target.value);
    }
  }
}
