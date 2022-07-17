import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { RestauranteEndpointService } from 'src/app/backend/restaurante-endpoint.service';
import { MostraEnderecoComponent } from 'src/app/components/modais/mostra-endereco/mostra-endereco.component';
import { HeaderService } from 'src/app/components/template/header/header.service';
import { SiderbarService } from 'src/app/components/template/sidebar/siderbar.service';
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
      'pagamentos', 'Actions'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  dataSource: MatTableDataSource<RestauranteModel>;
  restaurantes: RestauranteModel[] = [];
  input: any = { value: ''};
  produtos: ProdutoModel[] = [];
  formasPagamento: FormaPagamentoModel[] = []

  constructor(private sidebarService: SiderbarService,
    private restauranteEndpoint: RestauranteEndpointService,
    private swal: SwalService,
    private router: Router,
    private dialog: MatDialog,
    private headerService: HeaderService) {
      this.sidebarService.sidebarData = { page : 'listar-restaurantes'}
      this.headerService.headerData = {icon: 'restaurant', title: 'Restautantes'}
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
            produtos: this.produtos, //this.adicionarProdutos(restaurante.id), corrigir
            formasPagamento: this.formasPagamento //corrigir
          }
          this.restaurantes.push(rest);
        });
        this.dataSource = new MatTableDataSource(this.restaurantes);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        console.log(this.dataSource.data)
        this.temRestaurantes = true;
        this.waitingResponse= false;
      })
      .catch( erro => {
        this.swal.erroCarregarPagina(erro);
      })
  }

  adicionar(){
    this.router.navigateByUrl('/adicionar-restaurante')
  }

  adicionarFormasPagamento(idRestaurante: number) : FormaPagamentoModel[] {
    this.formasPagamento = null;
    this.formasPagamento = []
    this.restauranteEndpoint.listarFormasPagamento(idRestaurante)
      .toPromise()
      .then(pagamentos => {
        pagamentos._embedded.formasPagamento.forEach( pagamento => {
          let pag = { id: pagamento.id, descricao: pagamento.descricao}
          this.formasPagamento.push(pag)
        })
        return this.formasPagamento
      })
      .catch(erro => {
        this.swal.erroCarregarPagina(erro)
      })
    return [];
  }

  adicionarProdutos(idRestaurante: number): ProdutoModel[]{
    this.produtos = [];
    this.restauranteEndpoint.listarProdutos(idRestaurante)
    .toPromise()
    .then(produtos => {
      produtos._embedded.produtos.forEach(produto => {
        let prod = { id: produto.id, nome: produto.nome}
        this.produtos.push(prod);
      })
    })
    .catch(erro =>{
      this.swal.erroCarregarPagina(erro)
    })
    return this.produtos
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
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

}
