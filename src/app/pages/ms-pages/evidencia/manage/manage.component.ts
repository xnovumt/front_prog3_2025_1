import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Evidencia } from 'src/app/models/evidencia.model';
import { Servicio } from 'src/app/models/servicio.model';
import { Novedad } from 'src/app/models/novedad.model';
import { EvidenciaService } from 'src/app/services/evidenciaService/evidencia.service';
import { ServicioService } from 'src/app/services/servicioService/servicio.service';
import { NovedadService } from 'src/app/services/novedadService/novedad.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {

  mode: number; //1->View, 2->Create, 3-> Update
  evidencia: Evidencia;

  // Arrays para los selectores
  servicios: Servicio[] = [];
  novedades: Novedad[] = [];

  constructor(
    private activateRoute: ActivatedRoute,
    private evidenciaService: EvidenciaService,
    private servicioService: ServicioService,
    private novedadService: NovedadService,
    private router: Router
  ) {
    this.evidencia = {
      id: 0,
      tipo_de_archivo: '',
      contenido_archivo: '',
      fecha_de_carga: new Date(), // ✅ Corregido: usar new Date()
      id_servicio: undefined,
      novedad_id: undefined
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
    this.loadServicios();
    this.loadNovedades();

    if (this.activateRoute.snapshot.params.id) {
      this.evidencia.id = this.activateRoute.snapshot.params.id;
      this.getEvidencia(this.evidencia.id);
    }
  }

  // Métodos para cargar datos de los selectores
  loadServicios() {
    this.servicioService.list().subscribe({
      next: (data) => {
        this.servicios = data;
        console.log('Servicios cargados:', this.servicios);
      },
      error: (error) => {
        console.error('Error cargando servicios:', error);
      }
    });
  }

  loadNovedades() {
    this.novedadService.list().subscribe({
      next: (data) => {
        this.novedades = data;
        console.log('Novedades cargadas:', this.novedades);
      },
      error: (error) => {
        console.error('Error cargando novedades:', error);
      }
    });
  }

  getEvidencia(id: number) {
    this.evidenciaService.view(id).subscribe({
      next: (evidencia) => {
        this.evidencia = evidencia;
        // ✅ Convertir fecha si viene como string del backend
        if (this.evidencia.fecha_de_carga && typeof this.evidencia.fecha_de_carga === 'string') {
          this.evidencia.fecha_de_carga = new Date(this.evidencia.fecha_de_carga);
        }
        console.log('Evidencia fetched successfully:', this.evidencia);
      },
      error: (error) => {
        console.error('Error fetching evidencia:', error);
        Swal.fire('Error', 'No se pudo obtener la evidencia.', 'error');
      }
    });
  }

  back() {
    this.router.navigate(['evidencias/list']);
  }

  create() {
    if (!this.validateEvidencia()) {
      Swal.fire('Error', 'Por favor, complete todos los campos obligatorios.', 'error');
      return;
    }

    this.evidenciaService.create(this.evidencia).subscribe({
      next: (evidencia) => {
        console.log('Evidencia created successfully:', evidencia);
        Swal.fire({
          title: 'Creado!',
          text: 'Registro creado correctamente.',
          icon: 'success',
        }).then(() => {
          this.router.navigate(['/evidencias/list']);
        });
      },
      error: (error) => {
        console.error('Error creating evidencia:', error);
        Swal.fire('Error', 'No se pudo crear el registro.', 'error');
      }
    });
  }

  update() {
    if (!this.validateEvidencia()) {
      Swal.fire('Error', 'Por favor, complete todos los campos obligatorios.', 'error');
      return;
    }

    this.evidenciaService.update(this.evidencia).subscribe({
      next: (evidencia) => {
        console.log('Evidencia updated successfully:', evidencia);
        Swal.fire({
          title: 'Actualizado!',
          text: 'Registro actualizado correctamente.',
          icon: 'success',
        }).then(() => {
          this.router.navigate(['/evidencias/list']);
        });
      },
      error: (error) => {
        console.error('Error updating evidencia:', error);
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
        this.evidenciaService.delete(id).subscribe({
          next: () => {
            Swal.fire('Eliminado!', 'Registro eliminado correctamente.', 'success');
            this.router.navigate(['/evidencias/list']);
          },
          error: (error) => {
            console.error('Error al eliminar la evidencia:', error);
            Swal.fire('Error', 'No se pudo eliminar el registro.', 'error');
          }
        });
      }
    });
  }

  // ✅ Agregar el método validateEvidencia que faltaba
  private validateEvidencia(): boolean {
    return !!this.evidencia.tipo_de_archivo &&
      !!this.evidencia.contenido_archivo &&
      !!this.evidencia.fecha_de_carga &&
      !!this.evidencia.id_servicio;
    // Nota: novedad_id es opcional, por eso no está en la validación
  }

  // ✅ Método helper para formatear la fecha para el input datetime-local
  getFormattedDate(): string {
    if (!this.evidencia.fecha_de_carga) return '';

    const date = new Date(this.evidencia.fecha_de_carga);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    return `${year}-${month}-${day}T${hours}:${minutes}`;
  }

  // ✅ Método para actualizar la fecha cuando cambia el input
  onDateChange(event: any): void {
    if (event.target.value) {
      this.evidencia.fecha_de_carga = new Date(event.target.value);
    }
  }
}