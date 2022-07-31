import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { concat } from 'rxjs';
import { RestauranteEndpointService } from 'src/app/backend/restaurante-endpoint.service';
import { SwalService } from 'src/app/helper/swal/swal.service';
import { FormaPagamentoModel } from 'src/app/model/forma-pagamento/forma-pagamento-model';
import { RestauranteModel } from 'src/app/model/restaurante/restaurante-model';
import { HeaderService } from '../template/header/header.service';

@Component({
  selector: 'app-associar-pagamento',
  templateUrl: './associar-pagamento.component.html',
  styleUrls: ['./associar-pagamento.component.css']
})
export class AssociarPagamentoComponent implements OnInit {

  restaurante: RestauranteModel = {}
  formasPagamento: FormaPagamentoModel[] = [];
  waitingResponse: boolean = true;
  temFormasPagamento: boolean = false;
  formFormasPagamento = new FormControl();
  formasPagamentoAssociadas: string[] = [];
  formasPagamentoNaoAssociada: string[] = [];
 
  constructor(private router: Router,
    private swal: SwalService,
    private restauranteEndpoint: RestauranteEndpointService,
    private headerService: HeaderService) {
      this.headerService.headerData = { icon: 'restaurant', title: 'Restautantes' }
      if( this.router.getCurrentNavigation().extras?.state?.restaurante !== undefined){
        this.restaurante = this.router.getCurrentNavigation().extras?.state?.restaurante
      }else{
        this.swal.redirecionamento("Restaurante não informado.");
        this.router.navigateByUrl('listar-restaurantes')
      }
  }


  ngOnInit(): void {
    this.restauranteEndpoint.listarFormasPagamentosNaoAssociadasRestaurante(this.restaurante.id)
      .toPromise()
      .then(resp => {
        if(resp._embedded === undefined){
          this.swal.redirecionamento('Nenhuma forma de pagamento a ser associada ao restaurante.');
          this.router.navigateByUrl('listar-restaurantes')
        } else{
          this.formasPagamento = resp._embedded.formasPagamento
          this.temFormasPagamento = true;
          this.waitingResponse = false
        }
      })
      .catch(erro => {
        this.swal.erroCarregarPagina(erro)
        this.router.navigateByUrl('listar-restaurantes')
      })
  }

  salvar(){
    this.swal.esperandoProcesso("Aguarde por favor");
    this.formFormasPagamento.value.forEach(formaPagamento => {
      this.restauranteEndpoint.associarFormaPagametno(this.restaurante.id, formaPagamento.id)
        .toPromise()
        .then(() => this.formasPagamentoAssociadas.push(formaPagamento.descricao))
        .catch( () => this.formasPagamentoNaoAssociada.push(formaPagamento.descricao) )
    })
    this.validarAssociacao();
  }

  validarAssociacao() {
    let ok = '';
    this.swal.fecharSwalLoading()
    if (this.formasPagamentoAssociadas.length > 0) {
      this.formasPagamentoAssociadas.forEach((associada, i) => {
        if (i === 0) {
          ok.concat(associada)
        } else {
          ok.concat(", ", associada)
        }
      })
      this.swal.sucesso(`${ok} associdas ao restaurante ${this.restaurante.nome}`)
    }
    if (this.formasPagamentoNaoAssociada.length > 0) {
      this.formasPagamentoNaoAssociada.forEach((naoAssociada, i) => {
        if (i === 0) {
          ok.concat(naoAssociada)
        } else {
          ok.concat(", ", naoAssociada)
        }
      })
      this.swal.sucesso(`${ok} não associdas ao restaurante ${this.restaurante.nome}`)
    }
    this.router.navigateByUrl('listar-restaurantes')
  }

}
