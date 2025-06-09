import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-mapa-gps',
  templateUrl: './mapa-gps.component.html', // Solo contendrá el mapa
  styleUrls: ['./mapa-gps.component.scss']
})
export class MapaGpsComponent implements OnInit, OnChanges {
  // Estos @Input() son cruciales. Son la ÚNICA forma de pasarle coordenadas a este componente.
  @Input() latitude: number | null = null;
  @Input() longitude: number | null = null;
  @Input() zoom: number = 14; // Zoom inicial del mapa

  mapOptions: google.maps.MapOptions = {
    center: { lat: 5.0688, lng: -75.5173 }, // Coordenadas por defecto (Manizales)
    zoom: this.zoom,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  marker: google.maps.Marker | null = null;
  map: google.maps.Map | null = null; // Referencia al objeto de mapa de Google

  ngOnInit(): void {
    // Inicializar el centro del mapa con las coordenadas proporcionadas o por defecto
    this.updateMapCenterAndMarker();
  }

  ngOnChanges(changes: SimpleChanges): void {
    // Reaccionar si las propiedades de entrada (latitud, longitud, zoom) cambian
    if (changes['latitude'] || changes['longitude'] || changes['zoom']) {
      this.updateMapCenterAndMarker();
    }
  }

  // Actualiza el centro del mapa y la posición del marcador
  updateMapCenterAndMarker(): void {
    let currentLat = this.latitude || 5.0688; // Usar input o por defecto
    let currentLng = this.longitude || -75.5173; // Usar input o por defecto

    const newPosition = { lat: currentLat, lng: currentLng };
    this.mapOptions.center = newPosition;
    this.mapOptions.zoom = this.zoom; // Actualizar el zoom

    if (this.map) { // Si el mapa ya está inicializado
      this.map.setCenter(newPosition);
      this.map.setZoom(this.zoom);
    }

    // Crea o actualiza el marcador
    if (!this.marker) {
      this.marker = new google.maps.Marker({
        position: newPosition,
        map: this.map,
        draggable: false
      });
    } else {
      this.marker.setPosition(newPosition);
      if (!this.marker.getMap()) { // Asegura que el marcador esté en el mapa si se quitó
        this.marker.setMap(this.map);
      }
    }
  }

  // Callback cuando el mapa de Google se inicializa
  onMapInitialized(map: google.maps.Map): void {
    this.map = map;
    this.updateMapCenterAndMarker(); // Asegura que el mapa y el marcador se muestren al inicializarse
  }
}