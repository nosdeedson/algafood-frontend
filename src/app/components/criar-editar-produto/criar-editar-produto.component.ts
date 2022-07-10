import { Component, OnInit } from '@angular/core';
import { HeaderService } from '../template/header/header.service';
import { SiderbarService } from '../template/sidebar/siderbar.service';

@Component({
  selector: 'app-criar-editar-produto',
  templateUrl: './criar-editar-produto.component.html',
  styleUrls: ['./criar-editar-produto.component.css']
})
export class CriarEditarProdutoComponent implements OnInit {

  constructor(private header: HeaderService, 
    private sidebarService: SiderbarService) {
      this.header.headerData = { icon: 'label', title: 'Criar/Editar produto'};
      this.sidebarService.sidebarData = { page: 'criar-editar-produto'}
     }

  ngOnInit(): void {
  }

}
