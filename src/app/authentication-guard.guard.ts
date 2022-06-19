import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from './model/user/user';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuardGuard implements CanActivate {

  constructor(private routerRedirect: Router){  }

  usuario : User = {
    Authorities : [],
    token: ''
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      
      let usuario = JSON.parse(sessionStorage.getItem('user'));
      if(!usuario){
        this.routerRedirect.navigate(['/'])
      }  

      return true;
  }
  
}
