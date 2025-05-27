import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { SecurityService } from '../services/securityService/security.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticatedGuard implements CanActivate {
  
 private router: Router;
 constructor (private securitySevice: SecurityService){
 

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
    ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.securitySevice.existSession)
    { return true;}else{
      this.router.navigate(["/login"])
      return false;
    }
  }
  
}
