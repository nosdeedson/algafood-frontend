import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm, FormControl } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { CozinhaEndpointService } from 'src/app/backend/cozinha-endpoint.service';
import { SwalService } from 'src/app/helper/swal/swal.service';
import { CozinhaDTO } from 'src/app/model/cozinha/cozinha-model';
import Swal from 'sweetalert2';
import { HeaderService } from '../template/header/header.service';

@Component({
  selector: 'app-criar-editar-cozinha',
  templateUrl: './criar-editar-cozinha.component.html',
  styleUrls: ['./criar-editar-cozinha.component.css']
})
export class CriarEditarCozinhaComponent implements OnInit {
  @ViewChild('formCozinha') formCozinha: NgForm;
  editar: boolean = false;

  constructor(private route: Router,
    private cozinhaEndpointService: CozinhaEndpointService,
    private headerService: HeaderService,
    private swal: SwalService) {
      if(this.route.getCurrentNavigation().extras.state !== undefined){
        this.cozinha = this.route.getCurrentNavigation().extras.state.cozinha
        this.editar = true;
        this.headerService.headerData = {icon: 'kitchen', title:'Criar/Editar cozinha'}
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
        this.swal.sucesso(`Cozinha ${resp.nome} salva com sucesso`);
        this.route.navigateByUrl('listar-cozinhas');
      })
      .catch(error =>{
        this.swal.erroSalvarEditarObjeto(error)
      })
    }else{
      this.cozinhaAtualizar = {
        nome : this.cozinha.nome
      }
      this.cozinhaEndpointService.editar(this.cozinhaAtualizar, this.cozinha.id)
        .toPromise()
        .then(() =>{
          this.swal.sucesso(`Cozinha editarda com sucesso`);
          this.route.navigateByUrl('listar-cozinhas')
        })
        .catch(error =>{
          this.swal.erroSalvarEditarObjeto(error)
        })
    }
  }

}
