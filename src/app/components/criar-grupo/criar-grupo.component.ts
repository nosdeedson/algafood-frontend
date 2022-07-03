import { Component, OnInit } from '@angular/core';
import { SiderbarService } from '../template/sidebar/siderbar.service';

@Component({
  selector: 'app-criar-grupo',
  templateUrl: './criar-grupo.component.html',
  styleUrls: ['./criar-grupo.component.css']
})
export class CriarGrupoComponent implements OnInit {

  constructor(private sidebar: SiderbarService) {
    this.sidebar.sidebarData = { page: 'criar-permissao'}
   }

  ngOnInit(): void {
  }

}
