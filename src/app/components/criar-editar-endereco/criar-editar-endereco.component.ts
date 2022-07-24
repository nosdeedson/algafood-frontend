import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CidadeEndpointService } from 'src/app/backend/cidade-endpoint.service';
import { RestauranteEndpointService } from 'src/app/backend/restaurante-endpoint.service';
import { SwalService } from 'src/app/helper/swal/swal.service';
import { CidadeDTO } from 'src/app/model/cidade/cidade-model';
import { RestauranteModel } from 'src/app/model/restaurante/restaurante-model';


@Component({
  selector: 'app-criar-editar-endereco',
  templateUrl: './criar-editar-endereco.component.html',
  styleUrls: ['./criar-editar-endereco.component.css'],
  providers: [{ provide: STEPPER_GLOBAL_OPTIONS, useValue: { showError: true }, }]
})
export class CriarEditarEnderecoComponent implements OnInit {

  cidades: CidadeDTO[] = [];
  id: number = 0;
  idRestaurante : number = 0;
  restaurante: RestauranteModel = {}
  constructor(private cidadeEndpoint: CidadeEndpointService,
    private _formBuilder: FormBuilder,
    private router: Router,
    private restauranteEndpoint: RestauranteEndpointService,
    private swal: SwalService) {
      if( this.router.getCurrentNavigation().extras?.state?.idRestaurante !== undefined){
        this.idRestaurante = this.router.getCurrentNavigation().extras?.state?.idRestaurante;
      }else{
        this.swal.redirecionamento("Id empresa não informado.");
        this.router.navigateByUrl('/listar-restaurantes')
      }
    }

    formEndereco = this._formBuilder.group({
      bairro: ['', Validators.required],
      cep: ['', Validators.required],
      logradouro: ['', Validators.required],
      numero: ['', Validators.required],
      complemento: [''],
      idCidade: [this.id, Validators.required],
    });

  ngOnInit(): void {
    this.cidadeEndpoint.listar()
      .toPromise()
      .then( resp => {
        resp.content.forEach(cidade => {
          let city = {
            id: cidade.id,
            nome: cidade.nome
          }
          this.cidades.push(city)
        })
      })
      .catch( erro => {
        this.swal.erroCarregarPagina(erro);
      })
  }

  salvar(){
    this.swal.esperandoProcesso("Aguarde por favor.")
    this.restauranteEndpoint.buscar(this.idRestaurante)
      .toPromise()
      .then(resp => {
        console.log(resp)
        this.restaurante = {
          aberto: resp.aberto,
          cozinha: { id:  resp.cozinha.id},
          ativo: resp.ativo,
          endereco : {
            bairro: this.formEndereco.get('bairro').value,
            cep: this.formEndereco.get('cep').value,
            logradouro: this.formEndereco.get('logradouro').value,
            numero: this.formEndereco.get('numero').value,
            complemento: this.formEndereco.get('complemento').value,
            cidade : { id : this.formEndereco.get('idCidade').value}
          },
          nome: resp.nome,
          taxaFrete: resp.taxaFrete
        }
        console.log(this.restaurante)
        this.restauranteEndpoint.atualizar(this.idRestaurante, this.restaurante)
          .toPromise()
          .then(resp => {
            this.swal.fecharSwalLoading();
            this.swal.sucesso(`Restaurante ${resp.nome} atualizado.`);
            this.router.navigateByUrl('/listar-restaurantes')
          })
          .catch(erro => this.swal.erroSalvarEditarObjeto(erro))
      })
      .catch(erro => this.swal.erroCarregarPagina(erro))
  }

  voltar(){
    this.router.navigateByUrl('listar-restaurantes')
  }

}
