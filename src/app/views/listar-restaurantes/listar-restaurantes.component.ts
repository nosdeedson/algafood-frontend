import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { RestauranteEndpointService } from 'src/app/backend/restaurante-endpoint.service';
import { RestauranteProdutoEndpointService } from 'src/app/backend/restaurante-produto-endpoint.service';
import { CriarEditarEnderecoComponent } from 'src/app/components/criar-editar-endereco/criar-editar-endereco.component';
import { MostraEnderecoComponent } from 'src/app/components/modais/mostra-endereco/mostra-endereco.component';
import { HeaderService } from 'src/app/components/template/header/header.service';
import { SiderbarService } from 'src/app/components/template/sidebar/siderbar.service';
import { TirarIdService } from 'src/app/helper/change-interface/tirar-id.service';
import { SwalService } from 'src/app/helper/swal/swal.service';
import { FormaPagamentoModel } from 'src/app/model/forma-pagamento/forma-pagamento-model';
import { ProdutoModel } from 'src/app/model/produto/produto-model';
import { RestauranteModel } from 'src/app/model/restaurante/restaurante-model';

@Component({
  selector: 'app-listar-restaurantes',
  templateUrl: './listar-restaurantes.component.html',
  styleUrls: ['./listar-restaurantes.component.css']
})
export class ListarRestaurantesComponent implements OnInit {

  waitingResponse: boolean = false;
  temRestaurantes: boolean = false;
  displayedColumns: string[] = ['id', 'nome', 'cozinha', 'endereco', 'produtos', 
      'pagamentos', 'aberto', 'fazerPedido', 'Actions'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  dataSource: MatTableDataSource<RestauranteModel>;
  restaurantes: RestauranteModel[] = [];
  input: any = { value: ''};
  produtos: ProdutoModel[] = [];
  formasPagamento: FormaPagamentoModel[] = []
  pagamentoSelecionadoId: number = 0;
  produtoSelicinadoId: number = 0;

  constructor(private sidebarService: SiderbarService,
    private restauranteEndpoint: RestauranteEndpointService,
    private restauranteProdutoEndpoint: RestauranteProdutoEndpointService,
    private swal: SwalService,
    private router: Router,
    private dialog: MatDialog,
    private headerService: HeaderService) {
    this.sidebarService.sidebarData = { page: 'listar-restaurantes' }
    this.headerService.headerData = { icon: 'restaurant', title: 'Restautantes' }
  }

  ngOnInit(): void {
    this.waitingResponse = true;
    this.restauranteEndpoint.listar()
      .toPromise()
      .then(resp => {
        resp._embedded.restaurantes.forEach(restaurante => {
          let rest = {
            id: restaurante.id,
            nome: restaurante.nome,
            aberto: restaurante.aberto,
            endereco: restaurante.endereco,
            cozinha: restaurante.cozinha,
            produtos: this.produtos,
            formasPagamento: this.formasPagamento
          }
          this.restauranteEndpoint.listarProdutos(restaurante.id)
            .toPromise()
            .then(produtos => {
              this.produtos = [];
              produtos._embedded.produtos.forEach(produto => {
                let prod = { id: produto.id, nome: produto.nome }
                this.produtos.push(prod);
                rest.produtos = this.produtos
              })
            })
            .catch(erro => {
              this.swal.erroCarregarPagina(erro)
            });
          this.restauranteEndpoint.listarFormasPagamento(restaurante.id)
            .toPromise()
            .then(pagamentos => {
              this.formasPagamento = [];
              pagamentos._embedded.formasPagamento.forEach(pagamento => {
                let pag = { id: pagamento.id, descricao: pagamento.descricao }
                this.formasPagamento.push(pag)
                rest.formasPagamento = this.formasPagamento
              })
            })
            .catch(erro => {
              this.swal.erroCarregarPagina(erro)
            })
          this.restaurantes.push(rest);
        });
        this.dataSource = new MatTableDataSource(this.restaurantes);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.temRestaurantes = true;
        this.waitingResponse = false;
      })
      .catch(erro => {
        this.swal.erroCarregarPagina(erro);
      })
  }

  abrir(restaurante: RestauranteModel){
    this.swal.esperandoProcesso("Aguarde por favor");
    this.restauranteEndpoint.abrir(restaurante.id)
      .toPromise()
      .then( () => {
        this.swal.fecharSwalLoading()
        this.swal.sucessoSemRetorno(`${restaurante.nome} aberto`)
        window.location.reload()
      })
      .catch(erro => {
        this.swal.fecharSwalLoading();
        this.swal.erroSalvarEditarObjeto(erro)
      })
  }

  adicionar(){
    this.router.navigateByUrl('/adicionar-restaurante')
  }

  adicionarEndereco(id: number){
    this.router.navigate(['/criar-endereco'], {state: {idRestaurante: id}});
  }

  adicionarProduto(idRestaurante: number){
    this.router.navigateByUrl('/criar-produto', {state: {'idRestaurante': idRestaurante}})
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  associarPagamento(restaurante: RestauranteModel){
    this.router.navigate(['associar-forma-pagamento'], { state: {restaurante}})
  }

  async deletar(restaurante: RestauranteModel){
    if(  (await this.swal.confirmacao(restaurante.nome)).valueOf()){
      this.swal.esperandoProcesso("Aguarde por favor.");
      this.restauranteEndpoint.inativar(restaurante.id)
        .toPromise()
        .then( () => {
          this.swal.fecharSwalLoading();
          this.swal.confimarDelecao(`${restaurante.nome}`);
          window.location.reload()
        })
        .catch( erro => {
          this.swal.fecharSwalLoading()
          this.swal.erroSalvarEditarObjeto(erro)
        })
    }
  }

  deletarProduto(idRestaurante: number){
    if(this.produtoSelicinadoId === 0){
      this.swal.objetoNaoSelecionado('Selecione um produto a ser deletado.');
      return;
    }
    this.swal.esperandoProcesso("Aguarde por favor");
    this.restauranteProdutoEndpoint.deletarProduto(idRestaurante, this.produtoSelicinadoId)
      .toPromise()
      .then( () => {
        this.swal.fecharSwalLoading();
        this.swal.sucessoSemRetorno("Produto deletado.");
        window.location.reload()
      })
      .catch( erro => {
        this.swal.fecharSwalLoading();
        this.swal.erroSalvarEditarObjeto(erro);
      })
  }

  desassociarPagamento(restaurante: RestauranteModel){
    this.swal.esperandoProcesso('Aguarde por favor.')
    if(this.pagamentoSelecionadoId === 0){
      this.swal.objetoNaoSelecionado('Selecione uma forma de pagamento');
      return;
    }
    this.restauranteEndpoint.desassociarFormaPagamento(restaurante.id, this.pagamentoSelecionadoId)
      .toPromise()
      .then( () => {
        this.swal.fecharSwalLoading()
        this.swal.sucessoSemRetorno('Forma de pagamento desassociada.')
        window.location.reload()
      })
      .catch(erro => this.swal.erroSalvarEditarObjeto(erro))
  }

  editar(restaurante: RestauranteModel){
    this.router.navigate(['editar-restaurante'], {state: {restaurante: restaurante}})
  }

  fechar(restaurante: RestauranteModel){
    this.swal.esperandoProcesso("Aguarde por favor");
    this.restauranteEndpoint.fechar(restaurante.id)
      .toPromise()
      .then(() => {
        this.swal.fecharSwalLoading();
        this.swal.sucessoSemRetorno(`${restaurante.nome} fechado.`)
        window.location.reload()
      })
      .catch( erro => {
        this.swal.fecharSwalLoading();
        this.swal.erroSalvarEditarObjeto(erro)
      })
  }

  listarProdutos(restaurante: RestauranteModel){
    this.router.navigate(['listar-produtos'], {state: {restaurante}})
  }

  openDialog(endereco: any): void {
    const dialogRef = this.dialog.open(MostraEnderecoComponent, {
      width: '250px',
      data: endereco,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result)
    });
  }

  selectPagamento(event: Event) {
    this.pagamentoSelecionadoId = Number((event.target as HTMLSelectElement).value);
  }

  selectProduto(event: Event) {
    this.produtoSelicinadoId = Number( (event.target as HTMLSelectElement).value )
  }
}


