import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { GrupoModel } from 'src/app/model/grupo/grupo-model';
import { SiderbarService } from '../template/sidebar/siderbar.service';
import { PermissaoModel } from 'src/app/model/grupo/permissao-model'
import { PermissaoEndpointService } from 'src/app/backend/permissao-endpoint.service';
import Swal from 'sweetalert2';
import { SwalService } from 'src/app/helper/swal/swal.service';
import { GrupoEndpointService } from 'src/app/backend/grupo-endpoint.service';
import { GrupoPermissaoDto } from 'src/app/model/grupo/grupo-permissao-dto';
import { HeaderService } from '../template/header/header.service';

@Component({
  selector: 'app-criar-grupo',
  templateUrl: './criar-grupo.component.html',
  styleUrls: ['./criar-grupo.component.css']
})
export class CriarGrupoComponent implements OnInit {

  permissao = new FormControl();
  grupo : GrupoPermissaoDto = { };
  permissoes : PermissaoModel[] = []
  idsSelecionados: number[] = [];
  constructor(private sidebar: SiderbarService,
    private header: HeaderService,
    private permissaoEndpoint: PermissaoEndpointService,
    private grupoEndpoint: GrupoEndpointService,
    private swal: SwalService) {
    this.sidebar.sidebarData = { page: 'criar-grupo'}
    this.header.headerData = { icon: 'group_work', title: 'Criar grupo'};
   }

  ngOnInit(): void {
    this.permissaoEndpoint.listar()
      .toPromise()
      .then( resp => {
        this.permissoes = resp._embedded.permissoes
      })
      .catch(erro => {
        this.swal.erroCarregarPagina(erro)
      })
  }

  async salvar() {
    if ( this.grupo.nome === undefined ){
      this.swal.objetoNaoSelecionado("Informe ao menos o nome do grupo.");
      return;
    }
    this.swal.esperandoProcesso("Aguarde por favor");
    let grupoPermissoes = [];
    this.idsSelecionados.forEach(id => {
      grupoPermissoes.push(id);
    })
    
    this.grupo.permissoes = grupoPermissoes
    await this.grupoEndpoint.salvarGrupoAssociarPermissoes(this.grupo)
      .toPromise()
      .then(resp => {
        this.swal.fecharSwalLoading();
        this.swal.sucesso(`Grupo ${resp.nome} salvo com sucesso`);
      })
      .catch(erro => {
        this.swal.erroSalvarEditarObjeto(erro);
      })
      window.location.reload();
  }
}
