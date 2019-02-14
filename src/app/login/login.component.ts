import { Router } from '@angular/router';
import { Component, Output, EventEmitter, Input } from '@angular/core';

import { User } from './user.model';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private router: Router, private loginService: LoginService) { }

  public user: User = {} as User;
  @Output()
  loginApp = new EventEmitter<User>();
  
  @Input()
  exibeLogin: boolean;

  login(user: User) {
    const {email, password} = user;
    this.loginApp.emit({email, password});
    this.loginService.loginWithEmail({email, password})
      .then((res) => {
        this.router.navigate(['alunos']);
      })
      .catch((err) => err);
  }
}
