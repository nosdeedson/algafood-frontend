import { Component, OnInit } from '@angular/core';
import { SiderbarService } from 'src/app/components/template/sidebar/siderbar.service';

@Component({
  selector: 'app-meu-perfil',
  templateUrl: './meu-perfil.component.html',
  styleUrls: ['./meu-perfil.component.css']
})
export class MeuPerfilComponent implements OnInit {

  constructor(private sidebarService: SiderbarService) {
    this.sidebarService.sidebarData = { page : 'meu-perfil'}
   }

  ngOnInit(): void {
  }

}
