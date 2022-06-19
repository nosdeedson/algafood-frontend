import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm, FormControl } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { CozinhaEndpointService } from 'src/app/backend/cozinha-endpoint.service';
import { CozinhaDTO } from 'src/app/model/cozinha/cozinha-model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-criar-editar-cozinha',
  templateUrl: './criar-editar-cozinha.component.html',
  styleUrls: ['./criar-editar-cozinha.component.css']
})
export class CriarEditarCozinhaComponent implements OnInit {
  @ViewChild('formCozinha') formCozinha: NgForm;
  editar: boolean = false;

  constructor(private route: Router,
    private cozinhaEndpointService: CozinhaEndpointService) {
      if(this.route.getCurrentNavigation().extras.state !== undefined){
        this.cozinha = this.route.getCurrentNavigation().extras.state.cozinha
        this.editar = true;
      }
     }


  cozinha: CozinhaDTO = {
    nome: ''
  }

  cozinhaAtualizar :CozinhaDTO = {
    nome : ''
  }

  ngOnInit(): void {
  }

  salvar(){
    if(!this.editar){

      this.cozinhaEndpointService.salvar(this.cozinha)
      .toPromise()
      .then(resp =>{
        this.sucesso()
        this.route.navigateByUrl('listar-cozinhas')
      })
      .catch(error =>{
        this.erro(error)
      })
    }else{
      this.cozinhaAtualizar = {
        nome : this.cozinha.nome
      }
      this.cozinhaEndpointService.editar(this.cozinhaAtualizar, this.cozinha.id)
        .toPromise()
        .then(() =>{
          this.sucesso()
          this.route.navigateByUrl('listar-cozinhas')
        })
        .catch(error =>{
          this.erro(error)
        })
    }
  }

  sucesso(){
    Swal.fire({
      title: 'Sucesso',
      icon: 'success',
      timer: 3000
    })
  }
  
  erro(error){
    Swal.fire({
      title: 'Erro',
      icon: 'error',
      timer: 3000,
      text: error.error.detail
    })
  }
}
