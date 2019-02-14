import { LoginService } from './login.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from "@angular/router";

@Injectable()
export class LoginGuard implements CanActivate {

  constructor(private loginService: LoginService, private router: Router) { }

  canActivate(): any {
    if  ( this.loginService.isLoggedIn() ) {
      return true;
    }
    this.router.navigate(['/']);
    return false;
  }
}
