import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import Aluno from './aluno.model';

@Injectable({
  providedIn: 'root'
})
export class AlunosService {

  alunos: Aluno[] = []

  private readonly url: string = '/api/alunos/search-by-id/';
  private readonly urlDelete: string = '/api/alunos/remove/';
  private readonly urlName: string = '/api/alunos/search-by-name/';
  private readonly urlSubmit: string = '/api/aluno/new';
  private readonly urlUpdate: string = '/api/alunos/update';

  constructor(private http: HttpClient) { }

  getByName(name: string): Observable<Aluno[]> {
    return this.http.get<any>(this.urlName + name);
  }

  getByID(id: string): Observable<Aluno> {
    return this.http.get<any>(this.url + id );
  }

  save(aluno: Aluno): Observable<Response> {
    if(aluno.id === 0){
      // Inserir
      return this.http.post<any>(this.urlSubmit, aluno);
    }
    else {
      // Atualizar
      return this.http.put<any>(this.urlUpdate, aluno);
    }
  }

  delete(id: number): Observable<Response>{
    return this.http.delete<any>(this.urlDelete + id);
  }

}

