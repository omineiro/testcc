import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import 'rxjs/add/operator/map';

import { Curso } from './cursos.model';

@Injectable({
  providedIn: 'root'
})
export class CursosService {

  cursos: Curso[] = []

  private readonly url: string = 'http://localhost:4201/api/courses/search-by-id/';
  private readonly urlDelete: string = 'http://localhost:4201/api/courses/remove/';
  private readonly urlName: string = 'http://localhost:4201/api/courses/search-by-name/';
  private readonly urlSubmit: string = 'http://localhost:4201/api/course/new';
  private readonly urlUpdate: string = 'http://localhost:4201/api/courses/update';
  private readonly urlGetAll: string = 'http://localhost:4201/api/courses/all';

  constructor(private http: HttpClient) {}

  getByName(name: string): Observable<Curso[]> {
    return this.http.get<any>(this.urlName + name);
  }

  getAll(): Observable<Curso[]> {
    return this.http.get<any>(this.urlGetAll);
  }

  getByID(id: string): Observable<Curso> {
    return this.http.get<any>(this.url + id );
  }

  save(curso: Curso): Observable<Response> {
    if(curso.id === 0){
      return this.http.post<any>(this.urlSubmit, curso);
    }
    else {
      return this.http.put<any>(this.urlUpdate, curso);
    }
  }

  delete(id: number): Observable<Response>{
    return this.http.delete<any>(this.urlDelete + id);
  }
  
}
