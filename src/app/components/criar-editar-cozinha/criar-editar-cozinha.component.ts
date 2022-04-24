import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CozinhaDTO } from 'src/app/model/cozinha/cozinha-model';

@Component({
  selector: 'app-criar-editar-cozinha',
  templateUrl: './criar-editar-cozinha.component.html',
  styleUrls: ['./criar-editar-cozinha.component.css']
})
export class CriarEditarCozinhaComponent implements OnInit {

  constructor() { }

  @ViewChild('formCozinha') formCozinha: NgForm
  cozinha: CozinhaDTO = {
    nome: ''
  }

  ngOnInit(): void {
  }

  salvar(){
    alert(this.cozinha.nome)
  }

}
