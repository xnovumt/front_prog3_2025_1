import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SeguridadService } from 'src/app/services/seguridadService/seguridad.service';

declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
  type: number;//0->No está logueado, se pone si no está logueado
  //1->Si está logueado, si se pone si está logueado
  //2->No importa
}
export const ROUTES: RouteInfo[] = [
  { path: '/tablero', title: 'Tablero', icon: 'ni-tv-2 text-primary', class: '', type: 2 },
  { path: '/maquina/list', title: 'Maquinas', icon: 'ni-settings text-blue', class: '', type: 1 },
  { path: '/servicio/list', title: 'Servicios', icon: 'ni-delivery-fast text-orange', class: '', type: 1 },
  { path: '/login', title: 'Login', icon: 'ni-key-25 text-info', class: '', type: 2 },
  { path: '/register', title: 'Registrarse', icon: 'ni-circle-08 text-pink', class: '', type: 2 },
  { path: '/tablero', title: 'Tablero', icon: 'ni-tv-2 text-primary', class: '', type: 1 },
  { path: '/perfil-usuario', title: 'Perfil Usuario', icon: 'ni-single-02 text-yellow', class: '', type: 1 },
  { path: '/tablas', title: 'Tablas', icon: 'ni-bullet-list-67 text-red', class: '', type: 1 },
  { path: '/iconos', title: 'Iconos', icon: 'ni-planet text-green', class: '', type: 1 },
  { path: '/mapas', title: 'Mapas', icon: 'ni-pin-3 text-orange', class: '', type: 1 }
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public menuItems: any[];
  public isCollapsed = true;
  public existSession: boolean;

  constructor(private router: Router, private seguridadService: SeguridadService) { }

  ngOnInit() {
    this.seguridadService.getUsuario().subscribe(() => {
      const isLoggedIn = this.seguridadService.existSession();
      this.menuItems = ROUTES.filter(menuItem => {
        if (isLoggedIn) {
          return menuItem.type === 1;
        } else {
          return menuItem.type === 0 || menuItem.type === 2;
        }
      });
    });

    this.router.events.subscribe(() => {
      this.isCollapsed = true;
    });
  }
}
