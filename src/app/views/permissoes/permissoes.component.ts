import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { GrupoPermissoesEndpointService } from 'src/app/backend/grupo-permissoes-endpoint.service';
import { PermissaoEndpointService } from 'src/app/backend/permissao-endpoint.service';
import { UsuarioGrupoEndpointService } from 'src/app/backend/usuario-grupo-endpoint.service';
import { PermissaoEditarComponent } from 'src/app/components/modais/permissao-editar/permissao-editar.component';
import { SiderbarService } from 'src/app/components/template/sidebar/siderbar.service';
import { SwalService } from 'src/app/helper/swal/swal.service';
import { GrupoModel } from 'src/app/model/grupo/grupo-model';
import { PermissaoModel } from 'src/app/model/grupo/permissao-model';

@Component({
  selector: 'app-permissoes',
  templateUrl: './permissoes.component.html',
  styleUrls: ['./permissoes.component.css']
})
export class PermissoesComponent implements OnInit{

  // firstTable
  displayedColumns: string[] = ['id', 'grupo', 'usuarios', 'userGrupoActions', 'permissoes', 
      'grupoPermissoesActions', 'permissoesActions'];
  @ViewChild(MatPaginator) paginator : MatPaginator;
  @ViewChild(MatSort) sort : MatSort;
  permissoesForm = new FormControl();
  usuariosForm = new FormControl();
  waitingResponse: boolean = true;
  temDados: boolean = false;
  grupos: GrupoModel[] = [];
  dataSource: MatTableDataSource<GrupoModel>;
  usuarioSelecionado : number = 0;
  permissaoSelecionada: PermissaoModel = { id : 0, nome : '', descricao: ''};
  permissaoAtualizar: PermissaoModel = { nome : '', descricao: ''};
  
  constructor(private router: Router,
    private grupoPermissaoEndpontService : GrupoPermissoesEndpointService,
    private usuarioGrupoEndpointService: UsuarioGrupoEndpointService,
    private permissaoEndpoint: PermissaoEndpointService,
    private swal: SwalService,
    private sidebarService: SiderbarService,
    private dialog: MatDialog) {
      this.sidebarService.sidebarData = { page : 'permissoes'}
      this.dataSource = new MatTableDataSource(this.grupos);
    }

  ngOnInit(): void {
    this.grupoPermissaoEndpontService.listar()
    .toPromise()
    .then(resp =>{
      resp._embedded.grupos.forEach((grupo: { id: number; nome: any; }) => {   
        let permissoes = [];
        let usuarios = [];
        this.grupoPermissaoEndpontService.listarPermissoesPorGrupoId(grupo.id)
        .toPromise()
        .then(resp => {
          resp._embedded.permissoes.forEach((permissaoResp: { id: any; descricao: any; nome: any; }) => {
            let permissao = {
              id: permissaoResp.id,
              descricao: permissaoResp.descricao,
              nome: permissaoResp.nome
            }
            permissoes.push(permissao)
          });
        })
        .catch(erro =>{
          this.swal.erroCarregarPagina(erro)
        })
        this.grupoPermissaoEndpontService.listarUsuariosPorGrupoId(grupo.id)
        .toPromise()
        .then(resp =>{
          resp._embedded.usuarios.forEach((userResp: { id: any; nome: any; email: any; }) =>{
            let user ={
              id: userResp.id,
              nome: userResp.nome,
              email: userResp.email
            }
            usuarios.push(user)
          })
        })
        .catch(erro =>{
          this.swal.erroCarregarPagina(erro)
          this.waitingResponse = false;
        })
        let grupoResp = {
          id: grupo.id,
          nome: grupo.nome,
          permissoes : permissoes,
          usuarios: usuarios
        }
        this.dataSource.data.push(grupoResp)
      });
      this.dataSource.paginator = this.paginator
      this.dataSource.sort = this.sort
      this.waitingResponse = false;
      this.temDados = true;
    })
    .catch(erro =>{
      this.swal.erroCarregarPagina(erro)
    })
  }

  associarUserPermitionGroup(){
    this.router.navigateByUrl('associar-usuario-perimissao-grupo')
  }

  atualizarPermissao(){
    this.swal.esperandoProcesso('Por favor aguarde');
    this.permissaoAtualizar = {nome: this.permissaoSelecionada.nome, descricao: this.permissaoSelecionada.descricao}
    this.permissaoEndpoint.atualizar(this.permissaoSelecionada.id, this.permissaoAtualizar)
      .toPromise()
      .then(resp => {
        this.swal.fecharSwalLoading();
        this.swal.sucesso(`Permissao (${resp.nome}) atualizada.`);
      }).catch(erro => {
        this.swal.erroSalvarEditarObjeto(erro);
      })
      .finally( () => {
        this.permissaoSelecionada = {id: 0, nome: '', descricao: ''};
        window.location.reload();
      })
  }

  criarGrupo(){
    this.router.navigateByUrl('criar-grupo')
  }

  criarPermissao(){
    this.router.navigateByUrl('criar-permissao')
  }

  deletarPermissao(){
    if ( this.permissaoSelecionada.id == 0){
      this.swal.objetoNaoSelecionado("Por favor selecione um Permissão.");
      return;
    }
    this.swal.esperandoProcesso('Por favor aguarde.')
    this.permissaoEndpoint.deletar(this.permissaoSelecionada.id)
      .toPromise()
      .then(() => {
        this.swal.fecharSwalLoading();
        this.swal.sucessoSemRetorno("Permissão deletada.");
        window.location.reload() 
      })
      .catch(erro => {
        this.swal.erroSalvarEditarObjeto(erro);
      })
  }

  desassociarGrupoPermissao(grupoId: number){
    if(this.permissaoSelecionada.id === 0){
      this.swal.objetoNaoSelecionado('Nenhuma permissão selecionada, selecione por favor.');
    }else{
      this.grupoPermissaoEndpontService.desassociarGrupoPermissao(grupoId, this.permissaoSelecionada.id)
        .toPromise()
        .then(resp =>{
          this.swal.sucessoSemRetorno('Permissão desassociada do Grupo.')
          this.permissaoSelecionada.id = 0;
          window.location.reload()
        })
        .catch( erro => {
          this.swal.erroSalvarEditarObjeto(erro);
        })
    }
  }

  desassociarGrupoUsuario(grupoId: number){
    if(this.usuarioSelecionado === 0){
      this.swal.objetoNaoSelecionado('Nenum usuário selecionado, por favor selecione.')
    }else{
      this.usuarioGrupoEndpointService.desassociarGrupoUsuario(this.usuarioSelecionado, grupoId)
        .toPromise()
        .then(() => {
          this.swal.sucessoSemRetorno('Usuário desassociado do grupo.')
          this.usuarioSelecionado = 0;
          window.location.reload()
        })
        .catch(erro =>{
          this.swal.erroCarregarPagina(erro);
        })
    }
  }
  
  openDialog(): void {
    if ( this.permissaoSelecionada.id === 0){
      this.swal.objetoNaoSelecionado("Por favor selecione uma Permissão.");
      return;
    }
    const dialogRef = this.dialog.open(PermissaoEditarComponent, {
      width: '250px',
      data: this.permissaoSelecionada,
    });

    dialogRef.afterClosed().subscribe(result => {
      if ( result !== undefined)
        this.atualizarPermissao();
    });
  }

  selectPermissao(event: Event){
    this.permissaoSelecionada.id = Number((event.target as HTMLSelectElement).value);
    this.dataSource.data.forEach((grupo: { permissoes: any[]; }) => {
      grupo.permissoes.forEach((permissao: { id: any; nome: any; descricao: any; }) => {
        if (permissao.id === this.permissaoSelecionada.id) {
          this.permissaoSelecionada.nome = permissao.nome;
          this.permissaoSelecionada.descricao = permissao.descricao;
        }
      })
    })
  }

  selectUsuario(event: Event){
    this.usuarioSelecionado = Number((event.target as HTMLSelectElement).value)
  }

  navegarAdicionar() {
    this.router.navigateByUrl("/adicionar-permissao")
  }

}
