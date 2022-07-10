import { Component, OnInit } from '@angular/core';
import { HeaderService } from 'src/app/components/template/header/header.service';
import { SiderbarService } from 'src/app/components/template/sidebar/siderbar.service';

@Component({
  selector: 'app-listar-pedidos',
  templateUrl: './listar-pedidos.component.html',
  styleUrls: ['./listar-pedidos.component.css']
})
export class ListarPedidosComponent implements OnInit {

  constructor(private sidebarService: SiderbarService,
    private header: HeaderService) {
    this.sidebarService.sidebarData = { page : 'listar-pedidos'};
    this.header.headerData = { icon: 'shopping_basket', title: 'Pedidos'}
   }

  ngOnInit(): void {
  }

}
