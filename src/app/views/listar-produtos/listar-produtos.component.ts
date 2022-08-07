import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { RestauranteProdutoEndpointService } from 'src/app/backend/restaurante-produto-endpoint.service';
import { HeaderService } from 'src/app/components/template/header/header.service';
import { SiderbarService } from 'src/app/components/template/sidebar/siderbar.service';
import { TirarIdService } from 'src/app/helper/change-interface/tirar-id.service';
import { SwalService } from 'src/app/helper/swal/swal.service';
import { ProdutoDto } from 'src/app/model/produto/produto-dto';
import { ProdutoModel } from 'src/app/model/produto/produto-model';
import { RestauranteModel } from 'src/app/model/restaurante/restaurante-model';

@Component({
  selector: 'app-listar-produtos',
  templateUrl: './listar-produtos.component.html',
  styleUrls: ['./listar-produtos.component.css']
})
export class ListarProdutosComponent implements OnInit {

  waitingResponse: boolean = true;
  listaDeProdutos: boolean = false;
  restaurante: RestauranteModel = null;
  produtos: ProdutoDto[] = []; 
  produto: ProdutoDto = {};
  dataSource: MatTableDataSource<ProdutoModel>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns: string[] = ['nome', 'descricao', 'preco', 'ativo', 'acoes'];
  input: any = { value: ''};

  constructor(private sidebar: SiderbarService,
    private header: HeaderService,
    private router: Router,
    private restauranteProdutoEndpoint: RestauranteProdutoEndpointService,
    private swal: SwalService) {
      this.restaurante = this.router.getCurrentNavigation().extras.state.restaurante !== undefined ? this.router.getCurrentNavigation().extras.state.restaurante : null;
      this.header.headerData = { icon: 'label', title: `Restaurante: ${this.restaurante.nome}` }
      this.sidebar.sidebarData = { page: 'listar-produtos'}
    }

  ngOnInit(): void {
    if( this.restaurante === null){
      this.swal.redirecionamento("Restaurante não informado.");
      this.router.navigateByUrl('listar-restaurantes');
    }
    this.restauranteProdutoEndpoint.listarProdutos(this.restaurante.id)
      .toPromise()
      .then(resp =>{
        resp._embedded.produtos.forEach(element => {
          this.produto = {};
          this.produto = element;
          this.produtos.push(this.produto);
        })
        this.listaDeProdutos = true;
      })
      .catch(erro => {
         this.swal.erroCarregarPagina(erro)
         this.listaDeProdutos = false;
      })
      
      this.waitingResponse = false
      this.dataSource = new MatTableDataSource(this.produtos);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort= this.sort;
  }

  deletar(produto: ProdutoModel){
    this.swal.esperandoProcesso("Aguarde por favor");
    this.restauranteProdutoEndpoint.deletarProduto(this.restaurante.id, produto.id)
      .toPromise()
      .then( () => {
        this.swal.fecharSwalLoading()
        this.router.navigateByUrl('listar-restaurantes')
      })
      .catch( erro => {
        this.swal.fecharSwalLoading();
        this.swal.erroSalvarEditarObjeto(erro)
      })
  }

  editar(produtoEditar: ProdutoDto){
    this.restaurante.produtos = [];
    this.restaurante.produtos.push(produtoEditar);
    this.router.navigate(['editar-produto'], {state: {restaurante: this.restaurante}})
  }
}
