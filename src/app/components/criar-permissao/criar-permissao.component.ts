import { Component, OnInit } from '@angular/core';
import { SiderbarService } from '../template/sidebar/siderbar.service';

@Component({
  selector: 'app-criar-permissao',
  templateUrl: './criar-permissao.component.html',
  styleUrls: ['./criar-permissao.component.css']
})
export class CriarPermissaoComponent implements OnInit {

  constructor(private sidebar: SiderbarService) {
    this.sidebar.sidebarData = { page: 'criar-permissao'}
   }

  ngOnInit(): void {
  }

}
