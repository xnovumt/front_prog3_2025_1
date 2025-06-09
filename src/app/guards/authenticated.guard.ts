import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { SeguridadService } from '../services/seguridadService/seguridadService';

@Injectable({
  providedIn: 'root'
})
export class AuthenticatedGuard implements CanActivate {

  private router: Router;
  constructor(private seguridadSevice: SeguridadService) {


  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.seguridadSevice.existSession) { return true; } else {
      this.router.navigate(["/login"])
      return false;
    }
  }

}
