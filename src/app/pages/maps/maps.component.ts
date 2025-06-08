import { Component, OnInit } from '@angular/core';
import { GPSService } from '../../services/gpsService/gps.service';
import { GPS } from '../../models/gps.model';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.scss']
})
export class MapsComponent implements OnInit {
  gpsData: GPS[] = [];
  mapUrl: SafeResourceUrl = '';

  constructor(private gpsService: GPSService, private sanitizer: DomSanitizer) { }

  ngOnInit() {
    // Cargar mapa por defecto primero
    this.loadDefaultMap();

    // Luego intentar cargar datos GPS
    this.gpsService.getGPSData().subscribe(
      data => {
        this.gpsData = data;
        console.log('GPS data loaded:', this.gpsData);
        if (this.gpsData.length > 0) {
          this.loadMapWithGPS();
        }
      },
      error => {
        console.error('Error loading GPS data:', error);
      }
    );
  }

  loadDefaultMap() {
    // Mapa por defecto en Manizales
    const googleMapsUrl = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3977.178638521779!2d-75.5874126852378!3d5.05977899668375!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e47a41948415475%3A0xdd1309595078905!2sLa%20Maquina%20Burger%20Manizales!5e0!3m2!1ses-419!2sco!4v1717218943942!5m2!1ses-419!2sco`;
    this.mapUrl = this.sanitizer.bypassSecurityTrustResourceUrl(googleMapsUrl);
    console.log('Default map loaded');
  }

  loadMapWithGPS() {
    const firstGPS = this.gpsData[0];
    console.log('Using GPS coordinates:', firstGPS);

    // Generar URL del mapa embed usando las coordenadas GPS reales
    const googleMapsUrl = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3977.178638521779!2d${firstGPS.longitud}!3d${firstGPS.latitud}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e47a41948415475%3A0xdd1309595078905!2sMachine%20Location!5e0!3m2!1ses-419!2sco!4v1717218943942!5m2!1ses-419!2sco`;
    this.mapUrl = this.sanitizer.bypassSecurityTrustResourceUrl(googleMapsUrl);
    console.log('Map URL generated with GPS:', googleMapsUrl);
  }
}
