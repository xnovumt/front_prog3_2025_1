import { Component, OnInit, ElementRef } from '@angular/core';
import { ROUTES } from '../sidebar/sidebar.component';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { Router } from '@angular/router';
import { SeguridadService } from 'src/app/services/seguridadService/seguridadService';
import { WebSocketService } from 'src/app/services/web-socket-service.service';
import { Subscription } from 'rxjs';
import { Usuario } from 'src/app/models/usuario.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  public focus;
  public listTitles: any[];
  public location: Location;
  user: Usuario;
  subscription: Subscription
  constructor(location: Location, private element: ElementRef, private router: Router, private seguridadService: SeguridadService, private webSocketService: WebSocketService) {
    this.location = location;
    this.subscription = this.seguridadService.getUsuario().subscribe(user => {

      this.user = user;
    }
    )
  }

  ngOnInit() {
    this.listTitles = ROUTES.filter(listTitle => listTitle);
    this.webSocketService.setNameEvent("notifications");
    this.webSocketService.callback.subscribe((res: any) => {
      console.log();

    })
  }
  getTitle() {
    var titlee = this.location.prepareExternalUrl(this.location.path());
    if (titlee.charAt(0) === '#') {
      titlee = titlee.slice(1);
    }

    for (var item = 0; item < this.listTitles.length; item++) {
      if (this.listTitles[item].path === titlee) {
        return this.listTitles[item].title;
      }
    }
    return 'Dashboard';
  }

}
