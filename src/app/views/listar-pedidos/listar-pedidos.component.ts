import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { PedidoEndpointService } from 'src/app/backend/pedido-endpoint.service';
import { ExibirFormaPagamentoPedidoComponent } from 'src/app/components/exibir-forma-pagamento-pedido/exibir-forma-pagamento-pedido.component';
import { HeaderService } from 'src/app/components/template/header/header.service';
import { SiderbarService } from 'src/app/components/template/sidebar/siderbar.service';
import { SwalService } from 'src/app/helper/swal/swal.service';
import { FormaPagamentoModel } from 'src/app/model/forma-pagamento/forma-pagamento-model';
import { PedidoDTO } from 'src/app/model/pedido/pedido-dto';
import { PedidoFilter } from 'src/app/model/pedido/pedido-filter';

@Component({
  selector: 'app-listar-pedidos',
  templateUrl: './listar-pedidos.component.html',
  styleUrls: ['./listar-pedidos.component.css']
})
export class ListarPedidosComponent implements OnInit {

  pedidoFilter: PedidoFilter = { clienteId: null, dataCriacaoFim: null, dataCriacaoInicio: null, restauranteId: null}
  waitingResponse: boolean = true;
  temPedidos:boolean = false;
  pedidos: PedidoDTO[] = [];
  pedido: PedidoDTO = {};
  displayedColumns: string[] = ['codigo', 'cliente', 'restaurante', 'dataCriacao', 
  'status', 'subTotal', 'taxaFrete', 'valorTotal', 'actions'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: MatTableDataSource<PedidoDTO>;

  formaPagamento: FormaPagamentoModel;

  constructor( 
    private dialog: MatDialog,
    private pedidoEndpoint: PedidoEndpointService,
    private swal: SwalService,
    private sidebarService: SiderbarService,
    private header: HeaderService) {
    this.sidebarService.sidebarData = { page : 'listar-pedidos'};
    this.header.headerData = { icon: 'shopping_basket', title: 'Pedidos'}
   }

  ngOnInit(): void {
    this.waitingResponse = false
    this.pedidoEndpoint.listar(this.pedidoFilter)
      .toPromise()
      .then( resp =>{
        resp._embedded.pedidos.forEach(element => {
          this.pedido = {}
          this.pedido = {
            cliente: element.cliente,
            codigo: element.codigo,
            dataCriacao: element.dataCriacao,
            restaurante: element.restaurante,
            status: element.status,
            subTotal: element.subTotal,
            taxaFrete: element.taxaFrete,
            valorTotal: element.valorTotal
          };
          this.pedidos.push(this.pedido);
        });
        this.temPedidos = true;
        this.dataSource = new MatTableDataSource(this.pedidos)
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort
      })
      .catch(erro =>{
        this.temPedidos = false;
        this.swal.erroCarregarPagina(erro)
      })
      this.waitingResponse = false;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  cancelar(pedido: PedidoDTO){
    this.swal.esperandoProcesso('Aguarde por favor.');
    this.pedidoEndpoint.cancelar(pedido.codigo)
        .toPromise()
        .then(() => {
          this.swal.fecharSwalLoading();
          this.swal.sucessoSemRetorno(`Pedido de código ${pedido.codigo} foi cancelado.`)
          window.location.reload()
        })
        .catch(erro =>{
          this.swal.fecharSwalLoading();
          this.swal.erroSalvarEditarObjeto(erro);
        })
  }

  confirmar(pedido: PedidoDTO){
    this.swal.esperandoProcesso("Aguarde por favor.")
    this.pedidoEndpoint.confirmar(pedido.codigo)
      .toPromise()
      .then(response => {
        this.swal.fecharSwalLoading()
        this.swal.sucessoSemRetorno(`Pedido de código: ${pedido.codigo} confirmado.` )
        window.location.reload();
      })
      .catch(erro =>{
        this.swal.erroSalvarEditarObjeto(erro)
      })
  }

  entregar(pedido: PedidoDTO){
    this.swal.esperandoProcesso('Aguarde por favor.');
    this.pedidoEndpoint.entregar(pedido.codigo)
        .toPromise()
        .then( () =>{
          this.swal.fecharSwalLoading();
          this.swal.sucessoSemRetorno(`Pedido de código ${pedido.codigo} alterado para entregue.`);
          window.location.reload();
        })
        .catch(erro => {
          this.swal.fecharSwalLoading();
          this.swal.erroSalvarEditarObjeto(erro)
        })
  }

  async mostrarFormaPagamento(pedido: PedidoDTO){
    await this.pedidoEndpoint.buscarFormaPagamento(pedido.codigo)
        .toPromise()
        .then(resp =>{
          this.formaPagamento = {
            descricao: resp.descricao,
            id: resp.id
          }
        })
    const fp = this.dialog.open(ExibirFormaPagamentoPedidoComponent,{
      width: '300px',
      data: this.formaPagamento
    })
  }
}
