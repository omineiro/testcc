import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup } from '@angular/forms';

import swal from 'sweetalert2';
import { CursosService } from './../../cursos/cursos.service';
import { AlunosService } from './../alunos.service';
import Aluno from '../aluno.model';
import { Curso } from './../../cursos/cursos.model';

@Component({
  selector: 'app-alunos-detalhe',
  templateUrl: './alunos-detalhe.component.html'
})
export class AlunosDetalheComponent implements OnInit {

  id: string;
  aluno: Aluno = new Aluno();
  selectedCourse: number;
  formulario: FormGroup;
  cursos: Curso[] = []
  private inscrever: boolean = true;

  constructor(
    private alunoservice: AlunosService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private location: Location,
    private router: Router,
    private cursoService: CursosService
  ) { }

  ngOnInit() {

    this.formulario = this.formBuilder.group({
      name: [null],
      nascimento: [null],
      cursoid: [0],
      email: [null],
      id: [null]
    })

    this.cursoService.getAll()
    .takeWhile(() => this.inscrever)
      .subscribe((cursos: Curso[]) => {
      this.cursos = cursos;
    })

    this.route.params.takeWhile(() => this.inscrever)
      .subscribe((parametro: any) => {
      this.id = parametro.id;
      if (this.id !== "0") {
        this.alunoservice.getByID(this.id).takeWhile(() => this.inscrever).subscribe((aluno: Aluno) => {
          this.aluno = aluno;
          this.formulario.controls.cursoid.setValue(aluno.cursoid);
        })
      }
    })
  }

  remover() {
    swal({
      title: 'Deseja deletar?',
      text: 'A ação não poderá ser desfeita!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, deletar!'
    }).then((result) => {
      if (result.value) {
        this.alunoservice.delete(this.aluno.id).takeWhile(() => this.inscrever).subscribe(() => {
          swal(
            'Deletado!',
            'Aluno deletado com sucesso',
            'success'
          )
          this.router.navigate(['/alunos']);
        })
      }
    })
  }

  save() {
    let aluno: Aluno = this.formulario.value;
    aluno.id = +this.id;
    this.alunoservice.save(aluno).takeWhile(() => this.inscrever).subscribe((res: Response) => {
      swal(
        'Salvo!',
        'Aluno salvo com sucesso',
        'success'
      )
      this.router.navigate(['/alunos']);

    })
  }

  voltar(): void {
    this.location.back();
  }

  ngOnDestroy() {
    this.inscrever = false;
  }

}
