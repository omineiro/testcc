import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { APP_ROUTES } from './app.routing';
import { CursosComponent } from './cursos/cursos.component';
import { CursoDetalheComponent } from './cursos/curso-detalhe/curso-detalhe.component';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { MenuComponent } from './menu/menu.component';
import { AlunosComponent } from './alunos/alunos.component';
import { AlunosDetalheComponent } from './alunos/alunos-detalhe/alunos-detalhe.component';
import { AlunosService } from './alunos/alunos.service';
import { CursosService } from './cursos/cursos.service';
import { LoginService } from './login/login.service';
import { LoginGuard } from './login/login-guard.service';

import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { CONFIG } from './api';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { MaterializeModule } from 'angular2-materialize';
import { HttpClientModule, HttpClient } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CursosComponent,
    CursoDetalheComponent,
    HeaderComponent,
    HomeComponent,
    MenuComponent,
    AlunosComponent,
    AlunosDetalheComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    NgxPaginationModule,
    MaterializeModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(CONFIG),
    AngularFireAuthModule,
    AngularFirestoreModule,
    RouterModule.forRoot(APP_ROUTES),
  ],
  providers: [LoginGuard, LoginService, CursosService],
  bootstrap: [AppComponent]
})
export class AppModule { }
