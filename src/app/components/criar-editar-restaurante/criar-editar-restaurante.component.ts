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
    private router: Router,
    private swal: SwalService) {
    this.headerService.headerData = { icon: 'restaurant', title: 'Restaurante' }
  }

  ativo: boolean = false
  aberto: boolean = false
  id: number = 0;
  restaurante: RestauranteModel = {};
  cozinhas: CozinhaDTO[] = [];
  cidades: CidadeDTO[] = [];

  formRestaurante = this._formBuilder.group({
    nome: ['', Validators.required],
    taxaFrete: ['', Validators.required],
    ativo: [this.ativo],
    aberto: [this.aberto]
  });

  formCozinha = this._formBuilder.group({
    idCozinha: [this.id, Validators.required],
  });

  formEndereco = this._formBuilder.group({
    bairro: ['', Validators.required],
    cep: ['', Validators.required],
    logradouro: ['', Validators.required],
    numero: ['', Validators.required],
    complemento: [''],
    idCidade: [this.id, Validators.required],
  });

  ngOnInit(): void {
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

  salvar() {
    this.swal.esperandoProcesso('Por favor aguarde');
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
    this.restauranteEndpoind.salvar(this.restaurante)
      .toPromise()
      .then( resp => {
        this.swal.fecharSwalLoading();
        this.swal.sucesso(`Restaurante ${resp.nome} salvo`)
        this.router.navigateByUrl('/listar-restaurantes')
      })
      .catch( erro => {
        this.swal.fecharSwalLoading();
        this.swal.erroSalvarEditarObjeto(erro)
      })
  }

}
