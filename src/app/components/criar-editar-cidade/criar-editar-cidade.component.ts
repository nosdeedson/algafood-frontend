import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
import { CidadeEndpointService } from 'src/app/backend/cidade-endpoint.service';
import { EstadoEndpointService } from 'src/app/backend/estado-endpoint.service';
import { CidadeDTO } from 'src/app/model/cidade/cidade-model';
import Swal from 'sweetalert2';
import { HeaderService } from '../template/header/header.service';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-criar-editar-cidade',
  templateUrl: './criar-editar-cidade.component.html',
  styleUrls: ['./criar-editar-cidade.component.css']
})


export class CriarEditarCidadeComponent implements OnInit {

  @ViewChild('formCidade') formCidade : NgForm

  // selected = new FormControl('valid', [
  //   Validators.required,
  //   Validators.pattern('valid'),
  // ]);

  // selectFormControl = new FormControl('valid', [
  //   Validators.required,
  //   Validators.pattern('valid'),
  // ]);

  // nativeSelectFormControl = new FormControl('valid', [
  //   Validators.required,
  //   Validators.pattern('valid'),
  // ]);

  matcher = new MyErrorStateMatcher();

  cidade: CidadeDTO = {
    nome : '',
    estado : {
      id : null
    }
  }

  cidadeSalvar: CidadeDTO;
  edicao: boolean = false;
  estados: any[] = [];
  estadoSelecionado: number;

  constructor(
    private router: Router,
    private cidadeEndpoint: CidadeEndpointService,
    private estadoEndpoint: EstadoEndpointService,
    private headerService: HeaderService ) {
      if ( this.router.getCurrentNavigation().extras.state !== undefined){
        this.cidade = this.router.getCurrentNavigation().extras.state.cidade;
        this.edicao = true;
        this.headerService.headerData = { icon: 'location_city', title: 'Criar/Editar cidade'}
      }
     }

  ngOnInit(): void {
    if ( !this.edicao){

      this.estadoEndpoint.listar()
      .toPromise()
      .then(resp =>{
        this.estados = resp._embedded.estados
      })
      .catch(e =>{
        if(e.error.status === 403){
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Faça o login novamente.'
          })
        } else{
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: e.error.detail
          })
        }
      })
    }
  }

  async editar(){
    this.cidadeSalvar = {
      nome: this.cidade.nome,
      estado:{
        id: this.cidade.estado.id
      }
    }
    let id = this.cidade.id;
    await this.cidadeEndpoint.editar(this.cidadeSalvar, id)
        .toPromise()
        .then(resp =>{
          Swal.fire({
            icon:'success',
            title: 'Sucesso',
            text: 'Cidade editada com sucesso',
            timer: 3000
          })
          this.router.navigateByUrl('listar-cidades')
        })
        .catch(e =>{
          Swal.fire({
            icon: 'error',
            title: 'Erro',
            text: e.error.detail,
            timer: 3000
          })
        })
  }

  salvar(){
    this.cidadeSalvar ={
      nome: this.cidade.nome,
      estado :{
        id : this.estadoSelecionado
      }
    }
    this.cidadeEndpoint.salvar(this.cidadeSalvar)
        .toPromise()
        .then(resp =>{
          Swal.fire({
            title: 'Sucesso!',
            icon: 'success',
            timer: 3000
          })
          this.router.navigateByUrl('/listar-cidades')
        })
        .catch(error =>{
          Swal.fire({
            title: 'Error!',
            icon: 'error',
            text: error.error.detail
          })
        })
  }

}
