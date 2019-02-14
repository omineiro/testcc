import { User } from './login/user.model';
import { Component } from '@angular/core';
import { LoginService } from "./login/login.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent{
  
  exibeHome: boolean = false;
  exibeLogin: boolean = true;

  constructor(private loginService: LoginService){}

  login(user: User){
    const {email, password} = user;
    this.loginService.loginWithEmail({email, password}).then(res => {
      if(res && this.loginService.isLoggedIn())
      this.exibeHome = true;
      this.exibeLogin = false;
    });
  }


}
