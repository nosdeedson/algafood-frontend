import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { RestauranteModel } from 'src/app/model/restaurante/restaurante-model';
import { HeaderService } from '../template/header/header.service';
import { CozinhaDTO } from '../../model/cozinha/cozinha-model';
import { CozinhaEndpointService } from 'src/app/backend/cozinha-endpoint.service';
import { SwalService } from 'src/app/helper/swal/swal.service';
import { CidadeDTO } from 'src/app/model/cidade/cidade-model';
import { RestauranteEndpointService } from 'src/app/backend/restaurante-endpoint.service';
import { Router } from '@angular/router';
import { TirarIdService } from 'src/app/helper/change-interface/tirar-id.service';

@Component({
  selector: 'app-criar-editar-restaurante',
  templateUrl: './criar-editar-restaurante.component.html',
  styleUrls: ['./criar-editar-restaurante.component.css'],
  providers: [{ provide: STEPPER_GLOBAL_OPTIONS, useValue: { showError: true }, }]
})
export class CriarEditarRestauranteComponent implements OnInit {
  
  constructor(private headerService: HeaderService,
    private _formBuilder: FormBuilder,
    private cozinhaEndpoint: CozinhaEndpointService,
    private restauranteEndpoind: RestauranteEndpointService,
    private tirarIdRestaurante: TirarIdService,
    private router: Router,
    private swal: SwalService) {
      this.headerService.headerData = { icon: 'restaurant', title: 'Restaurante' }
      if(this.router.getCurrentNavigation().extras.state !== undefined){
        this.restaurante = this.router.getCurrentNavigation().extras?.state?.restaurante;
        this.editarRestaurante = true
      }
  }

  ativo: boolean = false
  aberto: boolean = false
  id: number = 0;
  restaurante: RestauranteModel = {};
  editarRestaurante: boolean = false;
  cozinhas: CozinhaDTO[] = [];
  cidades: CidadeDTO[] = [];
  formRestaurante: any;
  formCozinha: any;
  formEndereco: any;

  ngOnInit(): void {
    
    if(!this.editarRestaurante){
      this.cozinhaEndpoint.listar()
      .toPromise()
      .then(resp => {
        resp._embedded.cozinhas.forEach(cozinha => {
          let kitchen = {
            id: cozinha.id,
            nome : cozinha.nome
          }
          this.cozinhas.push(kitchen)
        });
      })
      .catch( erro => {
        this.swal.erroCarregarPagina(erro)
      })
    } 
      this.preencherForm();
  }

  preencherForm(){
    this.formRestaurante = this._formBuilder.group({
      nome: [this.restaurante.nome, Validators.required],
      taxaFrete: [this.restaurante.taxaFrete, Validators.required],
      ativo: [this.restaurante.ativo],
      aberto: [this.restaurante.aberto]
    });
    this.formCozinha = this._formBuilder.group({
      idCozinha: [this.restaurante?.cozinha?.id, Validators.required],
    });
  
    this.formEndereco = this._formBuilder.group({
      bairro: [this.restaurante?.endereco?.bairro, Validators.required],
      cep: [this.restaurante?.endereco?.cep, Validators.required],
      logradouro: [this.restaurante?.endereco?.logradouro, Validators.required],
      numero: [this.restaurante?.endereco?.numero, Validators.required],
      complemento: [this.restaurante?.endereco?.complemento],
      idCidade: [this.restaurante?.endereco?.cidade?.id, Validators.required],
    });
  }

  salvar() {
    this.swal.esperandoProcesso('Por favor aguarde');
    let id = 0;
    if( this.editarRestaurante){
      id = this.restaurante.id
    }
    this.restaurante = {
      nome : this.formRestaurante.get('nome').value,
      taxaFrete: this.formRestaurante.get('taxaFrete').value,
      ativo : this.formRestaurante.get('ativo').value,
      aberto: this.formRestaurante.get('aberto').value,
      cozinha:  {id : this.formCozinha.get('idCozinha').value},
      endereco : {
        bairro: this.formEndereco.get('bairro').value,
        cep: this.formEndereco.get('cep').value,
        logradouro: this.formEndereco.get('logradouro').value,
        numero: this.formEndereco.get('numero').value,
        complemento: this.formEndereco.get('complemento').value,
        cidade : { id : this.formEndereco.get('idCidade').value}
      }
    }
    if ( this.editarRestaurante){
      console.log(this.restaurante)
      this.restaurante = this.tirarIdRestaurante.tirarIdRestaurante(this.restaurante);
      this.restauranteEndpoind.atualizar(id, this.restaurante)
        .toPromise()
        .then( resp => {
          this.swal.fecharSwalLoading();
          this.swal.sucesso(`${resp.nome} atualizado.`);
          this.router.navigateByUrl( 'listar-restaurantes');
        })
        .catch( erro => {
          this.swal.fecharSwalLoading();
          this.swal.erroSalvarEditarObjeto(erro)
        })
    } else{
      this.restauranteEndpoind.salvar(this.restaurante)
        .toPromise()
        .then(resp => {
          this.swal.fecharSwalLoading();
          this.swal.sucesso(`Restaurante ${resp.nome} salvo`)
          this.router.navigateByUrl('/listar-restaurantes')
        })
        .catch(erro => {
          this.swal.fecharSwalLoading();
          this.swal.erroSalvarEditarObjeto(erro)
        })
    }
  }
}
