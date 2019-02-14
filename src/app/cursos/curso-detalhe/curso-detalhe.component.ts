import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { Location } from '@angular/common';
import "rxjs/add/operator/takeWhile";
import swal from 'sweetalert2'

import { CursosService } from './../cursos.service';
import { Curso } from './../cursos.model';

@Component({
  selector: 'app-curso-detalhe',
  templateUrl: './curso-detalhe.component.html'
})
export class CursoDetalheComponent {

  id: string;
  private alive: boolean = true;
  curso: Curso = new Curso();
  formulario: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private cursoService: CursosService,
    private router: Router,
    private location: Location,
    private formBuilder: FormBuilder,
  ) {}

  ngOnInit() {
    this.formulario = this.formBuilder.group({
      name: [null],
      teacher: [null],
      dateCreation: [null],
      id: [null]
    })

    this.route.params.takeWhile(() => this.alive).subscribe((parametro: any) => {
      this.id = parametro.id;
      if (this.id !== "0") {
        this.cursoService.getByID(this.id)
          .takeWhile(() => this.alive)
            .subscribe((curso: Curso) => {
            this.curso = curso;
        })
      }
    })
  }

  save() {
    let curso: Curso = this.formulario.value;
    curso.id = +this.id;
    this.cursoService.save(curso)
      .takeWhile(() => this.alive)
        .subscribe((res: Response) => {
      swal(
        'Salvo!',
        'Curso salvo com sucesso',
        'success'
      )
      this.router.navigate(['/cursos/busca']);
    })
  }

  voltar(): void {
    this.location.back();
  }
  
  ngOnDestroy() {
    this.alive = false;
  }
}
