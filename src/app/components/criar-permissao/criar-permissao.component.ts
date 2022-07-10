import { Component, OnInit } from '@angular/core';
import { PermissaoEndpointService } from 'src/app/backend/permissao-endpoint.service';
import { SwalService } from 'src/app/helper/swal/swal.service';
import { PermissaoModel } from 'src/app/model/grupo/permissao-model';
import { HeaderService } from '../template/header/header.service';
import { SiderbarService } from '../template/sidebar/siderbar.service';

@Component({
  selector: 'app-criar-permissao',
  templateUrl: './criar-permissao.component.html',
  styleUrls: ['./criar-permissao.component.css']
})
export class CriarPermissaoComponent implements OnInit {

  permissao: PermissaoModel = {};

  constructor(private sidebar: SiderbarService,
    private permissaoEndpoint: PermissaoEndpointService,
    private swal: SwalService,
    private header: HeaderService) {
    this.sidebar.sidebarData = { page: 'criar-permissao'}
    this.header.headerData = { icon: 'lock_open', title: 'Criar permissão'};
   }

  ngOnInit(): void {  }

  salvar(){
    if(Object.keys(this.permissao).length <=1 ){
      this.swal.objetoNaoSelecionado('Digite um Nome e uma descrição.');
      return;
    }
    this.swal.esperandoProcesso("Por favor Aguarde.");
    this.permissaoEndpoint.salvar(this.permissao)
      .toPromise()
      .then(resp => {
        this.swal.fecharSwalLoading();
        this.swal.sucesso(`Permissão ${resp.nome} salva com sucesso.`)
        this.permissao = {};
      })
      .catch( erro => {
        this.swal.erroSalvarEditarObjeto(erro)
      })
      window.location.reload();
  }

}
