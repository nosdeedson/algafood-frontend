import { Component, OnInit } from '@angular/core';
import { HeaderService } from 'src/app/components/template/header/header.service';
import { SiderbarService } from 'src/app/components/template/sidebar/siderbar.service';

@Component({
  selector: 'app-listar-produtos',
  templateUrl: './listar-produtos.component.html',
  styleUrls: ['./listar-produtos.component.css']
})
export class ListarProdutosComponent implements OnInit {

  waitingResponse: boolean = true;
  listaDeProdutos: boolean = false;

  constructor(private sidebar: SiderbarService,
    private header: HeaderService) {
      this.header.headerData = { icon: 'label', title: 'Produtos' }
      this.sidebar.sidebarData = { page: 'listar-produtos'}
     }

  ngOnInit(): void {
    this.waitingResponse = false
  }

}
