import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GPS } from 'src/app/models/gps.model';
import { Maquina } from 'src/app/models/maquina.model';
import { GPSService } from 'src/app/services/gpsService/gps.service';
import { MaquinaService } from 'src/app/services/maquinaService/maquina.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage-gps',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {

  mode: number = 1;
  gps: GPS;
  maquinas: Maquina[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private gpsService: GPSService,
    private router: Router,
    private maquinaService: MaquinaService
  ) {
    this.gps = {
      id: 0,
      latitud: 0,
      longitud: 0,
      maquina_id: undefined
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

    this.loadMaquinas();

    const idParam = this.activatedRoute.snapshot.params['id'];
    if (idParam) {
      this.gps.id = Number(idParam);
      this.getGPS(this.gps.id);
    }
  }

  loadMaquinas(): void {
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

  getGPS(id: number): void {
    this.gpsService.view(id).subscribe({
      next: (gpsData) => {
        this.gps = gpsData;
        console.log('GPS obtenido exitosamente:', this.gps);
      },
      error: (error) => {
        console.error('Error al obtener el GPS:', error);
        Swal.fire('Error', 'No se pudo obtener el GPS.', 'error');
      }
    });
  }

  back(): void {
    this.router.navigate(['/gps/list']);
  }

  create(): void {
    console.log('📊 Validando GPS antes de crear:', this.gps);

    if (!this.validateGPS()) {
      console.log('❌ Validación falló');
      Swal.fire('Error', 'Por favor, complete todos los campos obligatorios.', 'error');
      return;
    }

    console.log('✅ Validación pasó, enviando al backend:', this.gps);
    this.gpsService.create(this.gps).subscribe({
      next: (createdGPS) => {
        console.log('GPS creado exitosamente:', createdGPS);
        Swal.fire({
          title: '¡Creado!',
          text: 'Registro creado correctamente.',
          icon: 'success'
        }).then(() => {
          this.router.navigate(['/gps/list']);
        });
      },
      error: (error) => {
        console.error('Error al crear el GPS:', error);
        Swal.fire('Error', 'No se pudo crear el GPS.', 'error');
      }
    });
  }

  update(): void {
    if (!this.validateGPS()) {
      Swal.fire('Error', 'Por favor, complete todos los campos obligatorios.', 'error');
      return;
    }

    this.gpsService.update(this.gps).subscribe({
      next: (updatedGPS) => {
        console.log('GPS actualizado exitosamente:', updatedGPS);
        Swal.fire({
          title: '¡Actualizado!',
          text: 'Registro actualizado correctamente.',
          icon: 'success'
        }).then(() => {
          this.router.navigate(['/gps/list']);
        });
      },
      error: (error) => {
        console.error('Error al actualizar el GPS:', error);
        Swal.fire('Error', 'No se pudo actualizar el GPS.', 'error');
      }
    });
  }

  private validateGPS(): boolean {
    console.log('🔍 Validando campos:');
    console.log('  - latitud:', this.gps.latitud, 'válida:', !!this.gps.latitud && this.gps.latitud !== 0);
    console.log('  - longitud:', this.gps.longitud, 'válida:', !!this.gps.longitud && this.gps.longitud !== 0);
    console.log('  - maquina_id:', this.gps.maquina_id, 'válida:', !!this.gps.maquina_id);
    
    const isValid = (!!this.gps.latitud && this.gps.latitud !== 0) && 
                   (!!this.gps.longitud && this.gps.longitud !== 0) && 
                   !!this.gps.maquina_id;
    
    console.log('🎯 Resultado validación:', isValid);
    return isValid;
  }
}
