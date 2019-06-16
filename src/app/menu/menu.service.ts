import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Menu } from './menu.model';



@Injectable({
    providedIn: 'root'
})
export class MenuService {
    private urlMenu: string = '/api/menu';

    constructor(private http: HttpClient){}

    getMenu(): Observable<Menu[]>{
        return this.http.get<any>(this.urlMenu);
    }
}
