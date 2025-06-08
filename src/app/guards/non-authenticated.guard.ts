import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { SeguridadService } from '../services/seguridadService/seguridad.service';

@Injectable({
  providedIn: 'root'
})
export class NonAuthenticatedGuard implements CanActivate {
  constructor(private seguridadService: SeguridadService, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (this.seguridadService.existSession()) {
      this.router.navigate(['/tablero']);
      return false;
    } else {
      return true;
    }
  }

}
