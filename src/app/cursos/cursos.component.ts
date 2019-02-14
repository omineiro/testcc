import swal from 'sweetalert2'
import { Curso } from './cursos.model';
import { CursosService } from './cursos.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import "rxjs/add/operator/takeWhile";

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.css']
})

export class CursosComponent implements OnInit, OnDestroy {

  public cursos: Curso[];
  private alive: boolean = true;

  constructor(private cursosService: CursosService) {}

  ngOnInit(){}
  search(name: string) {
    if(!name){
      return;      
    }
    this.cursosService.getByName(name)
        .takeWhile(() => this.alive).subscribe((cursos: Curso[]) => {
      this.cursos = cursos;
    })
  }

  remover(curso: Curso) {
    swal({
      title: 'Deseja deletar?',
      text: 'A ação não poderá ser desfeita!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Sim, deletar!'
    }).then((result) => {
      if (result.value) {
        this.cursosService.delete(curso.id).takeWhile(() => this.alive).subscribe(() => {
          this.cursos = this.cursos.filter((value: Curso) => {
            return value.id !== curso.id;
          })
          swal(
            'Deletado!',
            'Curso deletado com sucesso',
            'success'
          )
        })
      }
    })
  }

  ngOnDestroy() {
    this.alive = false;
  }
}
