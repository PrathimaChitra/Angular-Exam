import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { SignupService } from './signup.service';  

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {
  constructor(private login:SignupService,private router:Router){
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(this.login.isLoggedIn() && this.login.getUserRole()=='Student'){
      return true;
    }
    this.router.navigate(['login']);
    return false;
  }
}