import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Mantenimiento } from 'src/app/models/mantenimiento.model';
import { Maquina } from 'src/app/models/maquina.model';
import { MantenimientoService } from 'src/app/services/mantenimientoService/mantenimiento.service';
import { MaquinaService } from 'src/app/services/maquinaService/maquina.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {

  mode: number = 1; // 1 -> Ver, 2 -> Crear, 3 -> Actualizar
  mantenimiento: Mantenimiento;
  
  // Array para el selector
  maquinas: Maquina[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private mantenimientoService: MantenimientoService,
    private maquinaService: MaquinaService,
    private router: Router
  ) {
    this.mantenimiento = {
      id: 0,
      fecha: new Date(),
      estado: '',
      maquina_id: undefined,
      responsable: ''
    };
  }

  ngOnInit(): void {
    const currentUrl = this.activatedRoute.snapshot.url.join('/');
    if (currentUrl.includes('view')) {
      this.mode = 1;
    } else if (currentUrl.includes('create')) {
      this.mode = 2;
    } else if (currentUrl.includes('update')) {
      this.mode = 3;
    }

    // Cargar máquinas para el selector
    this.loadMaquinas();

    const idParam = this.activatedRoute.snapshot.params['id'];
    if (idParam) {
      this.mantenimiento.id = Number(idParam);
      this.getMantenimiento(this.mantenimiento.id);
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

  getMantenimiento(id: number): void {
    this.mantenimientoService.view(id).subscribe({
      next: (mantenimientoData) => {
        this.mantenimiento = mantenimientoData;
        // Convertir fecha si viene como string del backend
        if (this.mantenimiento.fecha && typeof this.mantenimiento.fecha === 'string') {
          this.mantenimiento.fecha = new Date(this.mantenimiento.fecha);
        }
        console.log('Mantenimiento obtenido exitosamente:', this.mantenimiento);
      },
      error: (error) => {
        console.error('Error al obtener el mantenimiento:', error);
        Swal.fire('Error', 'No se pudo obtener el mantenimiento.', 'error');
      }
    });
  }

  back(): void {
    this.router.navigate(['/mantenimientos/list']);
  }

  create(): void {
    if (!this.validateMantenimiento()) {
      Swal.fire('Error', 'Por favor, complete todos los campos obligatorios.', 'error');
      return;
    }

    console.log('Payload enviado al backend:', this.mantenimiento);
    this.mantenimientoService.create(this.mantenimiento).subscribe({
      next: (createdMantenimiento) => {
        console.log('Mantenimiento creado exitosamente:', createdMantenimiento);
        Swal.fire({
          title: '¡Creado!',
          text: 'Registro creado correctamente.',
          icon: 'success'
        }).then(() => {
          this.router.navigate(['/mantenimientos/list']);
        });
      },
      error: (error) => {
        console.error('Error al crear el mantenimiento:', error);
        Swal.fire('Error', 'No se pudo crear el mantenimiento.', 'error');
      }
    });
  }

  update(): void {
    if (!this.validateMantenimiento()) {
      Swal.fire('Error', 'Por favor, complete todos los campos obligatorios.', 'error');
      return;
    }

    this.mantenimientoService.update(this.mantenimiento).subscribe({
      next: (updatedMantenimiento) => {
        console.log('Mantenimiento actualizado exitosamente:', updatedMantenimiento);
        Swal.fire({
          title: '¡Actualizado!',
          text: 'Registro actualizado correctamente.',
          icon: 'success'
        }).then(() => {
          this.router.navigate(['/mantenimientos/list']);
        });
      },
      error: (error) => {
        console.error('Error al actualizar el mantenimiento:', error);
        Swal.fire('Error', 'No se pudo actualizar el mantenimiento.', 'error');
      }
    });
  }

  delete(id: number): void {
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
        this.mantenimientoService.delete(id).subscribe({
          next: () => {
            Swal.fire('¡Eliminado!', 'Registro eliminado correctamente.', 'success');
            this.router.navigate(['/mantenimientos/list']);
          },
          error: (error) => {
            console.error('Error al eliminar el mantenimiento:', error);
            Swal.fire('Error', 'No se pudo eliminar el mantenimiento.', 'error');
          }
        });
      }
    });
  }

  // Validación
  private validateMantenimiento(): boolean {
    return !!this.mantenimiento.fecha && 
           !!this.mantenimiento.estado && 
           !!this.mantenimiento.maquina_id && 
           !!this.mantenimiento.responsable;
  }

  // Método helper para formatear la fecha para el input date
  getFormattedDate(): string {
    if (!this.mantenimiento.fecha) return '';
    
    const date = new Date(this.mantenimiento.fecha);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    
    return `${year}-${month}-${day}`;
  }

  // Método para actualizar la fecha cuando cambia el input
  onDateChange(event: any): void {
    if (event.target.value) {
      this.mantenimiento.fecha = new Date(event.target.value);
    }
  }
}
