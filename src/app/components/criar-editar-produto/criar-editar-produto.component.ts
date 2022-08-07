import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RestauranteProdutoEndpointService } from 'src/app/backend/restaurante-produto-endpoint.service';
import { TirarIdService } from 'src/app/helper/change-interface/tirar-id.service';
import { SwalService } from 'src/app/helper/swal/swal.service';
import { ProdutoDto } from 'src/app/model/produto/produto-dto';
import { RestauranteModel } from 'src/app/model/restaurante/restaurante-model';
import { HeaderService } from '../template/header/header.service';
import { SiderbarService } from '../template/sidebar/siderbar.service';

@Component({
  selector: 'app-criar-editar-produto',
  templateUrl: './criar-editar-produto.component.html',
  styleUrls: ['./criar-editar-produto.component.css']
})
export class CriarEditarProdutoComponent implements OnInit {

  idRestaurante: number = 0;
  produto: ProdutoDto = {};
  restaurante: RestauranteModel = {};
  editarProduto: boolean= false;
  
  constructor(private header: HeaderService,
    private router: Router,
    private swal: SwalService,
    private restauranteProdutoEndpoint: RestauranteProdutoEndpointService,
    private tirarId: TirarIdService,
    private sidebarService: SiderbarService) {
      this.header.headerData = { icon: 'label', title: 'Criar/Editar produto' };
      this.sidebarService.sidebarData = { page: 'criar-editar-produto' }
      if ( this.router.getCurrentNavigation().extras?.state?.idRestaurante !== undefined ){
        this.idRestaurante = this.router.getCurrentNavigation().extras?.state?.idRestaurante;
      } else if(this.router.getCurrentNavigation().extras?.state?.restaurante === undefined) {
        this.swal.redirecionamento('Id restaurante não informado.')
        this.router.navigateByUrl('listar-restaurantes')
      }
      if ( this.router.getCurrentNavigation() !== null &&
         this.router.getCurrentNavigation().extras?.state?.restaurante !== undefined ){
      this.restaurante = this.router.getCurrentNavigation().extras?.state?.restaurante;
      this.produto = this.restaurante.produtos[0];
      this.editarProduto = true;
    }
  }

  ngOnInit(): void {   }

  salvar() {
    this.swal.esperandoProcesso('Aguarde por favor.');
    if (this.editarProduto) {
      let idProduto = this.produto.id;
      this.produto = this.tirarId.tirarIdProduto(this.produto);
      this.restauranteProdutoEndpoint.editarProduto(this.restaurante.id, idProduto, this.produto )
        .toPromise()
        .then(resp =>{
          this.swal.fecharSwalLoading();
          this.swal.sucesso(`Produto ${resp.nome} salvo.`);
        })
        .catch(erro => {
          this.swal.fecharSwalLoading();
          this.swal.erroSalvarEditarObjeto(erro)
        })
        .finally(() => this.router.navigateByUrl('listar-restaurantes') )
    } else {
      if (this.produto.ativo === undefined) {
        this.swal.objetoNaoSelecionado('Por favor clique em \"Ativo\".');
        return;
      }
      this.restauranteProdutoEndpoint.criarProdutos(this.idRestaurante, this.produto)
        .toPromise()
        .then(resp => {
          this.swal.fecharSwalLoading();
          this.swal.sucesso(`Produto ${resp.nome} salvo.`);
          this.produto = {}
        })
        .catch(erro => this.swal.erroSalvarEditarObjeto(erro))
    }
  }

  voltar(){
    this.router.navigateByUrl('listar-restaurantes')
  }

}
