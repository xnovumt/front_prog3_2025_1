// src/app/pages/ms-pages/gps/gps-location-view/gps-location-view.component.ts

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GPSService } from 'src/app/services/gpsService/gps.service'; // <-- Importa tu servicio GPS
import { GPS } from 'src/app/models/gps.model'; // <-- Importa tu modelo GPS

@Component({
  selector: 'app-gps-location-view',
  templateUrl: './gps-location-view.component.html',
  styleUrls: ['./gps-location-view.component.scss']
})
export class GpsLocationViewComponent implements OnInit {
  gpsId: string | null = null;
  currentLatitude: number | null = null;
  currentLongitude: number | null = null;
  loading: boolean = true;
  errorMessage: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private gpsService: GPSService // <-- Inyecta tu servicio GPS
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.gpsId = params.get('id'); // Obtener el ID de la URL

      if (this.gpsId) {
        const idNumber = Number(this.gpsId);
        if (!isNaN(idNumber)) {
          this.loadGpsCoordinates(idNumber); // Llamar a la función para cargar datos reales
        } else {
          this.errorMessage = 'ID de GPS inválido en la URL.';
          this.loading = false;
        }
      } else {
        this.errorMessage = 'No se proporcionó ID de GPS en la URL.';
        this.loading = false;
        // Opcional: Si quieres mostrar un mapa vacío o con coordenadas por defecto si no hay ID
        // this.currentLatitude = 5.0688; // Coordenada por defecto
        // this.currentLongitude = -75.5173;
      }
    });
  }

  loadGpsCoordinates(id: number): void {
    this.loading = true;
    this.errorMessage = null;

    // AHORA SÍ: Llama a tu servicio GPS para obtener los datos por ID
    this.gpsService.view(id).subscribe({ // Asumo que tienes un método 'view(id)' en tu GPSService
      next: (gpsData: GPS) => {
        // Asegúrate de que latitud y longitud sean números antes de asignarlos
        this.currentLatitude = Number(gpsData.latitud);
        this.currentLongitude = Number(gpsData.longitud);
        this.loading = false;
      },
      error: (error) => {
        console.error('Error al obtener datos del GPS:', error);
        this.errorMessage = 'No se pudo cargar la información de ubicación GPS. Verifique el ID o la conexión.';
        this.loading = false;
      }
    });
  }

  // Funciones de navegación para los botones (se mantienen igual)
  navigateToEdit(): void {
    if (this.gpsId) {
      this.router.navigate(['/gps/update', this.gpsId]); // Asumiendo que 'update' es para editar
    } else {
      alert('No se puede editar: ID de GPS no disponible.');
    }
  }

  navigateToList(): void {
    this.router.navigate(['/gps/list']); // Ruta a tu lista de GPS
  }
}