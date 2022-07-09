import { Component, OnInit } from '@angular/core';
import { SiderbarService } from 'src/app/components/template/sidebar/siderbar.service';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css']
})
export class PedidosComponent implements OnInit {

  constructor(private sidebarService: SiderbarService) {
    this.sidebarService.sidebarData = { page : 'pedidos'}
   }

  ngOnInit(): void {
  }

}
