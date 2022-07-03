import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { GrupoPermissoesEndpointService } from 'src/app/backend/grupo-permissoes-endpoint.service';
import { PermissaoEndpointService } from 'src/app/backend/permissao-endpoint.service';
import { UserEndPointService } from 'src/app/backend/user-end-point-service.service';
import { UsuarioGrupoEndpointService } from 'src/app/backend/usuario-grupo-endpoint.service';
import { SwalService } from 'src/app/helper/swal/swal.service';
import { GrupoModel } from 'src/app/model/grupo/grupo-model';
import { PermissaoModel } from 'src/app/model/grupo/permissao-model';
import { UserDTO } from 'src/app/model/user/user-model';
import { PermissaoEditarComponent } from '../modais/permissao-editar/permissao-editar.component';
import { SiderbarService } from '../template/sidebar/siderbar.service';

@Component({
  selector: 'app-associar-user-permition-group',
  templateUrl: './associar-user-permition-group.component.html',
  styleUrls: ['./associar-user-permition-group.component.css']
})
export class AssociarUserPermitionGroupComponent implements OnInit {
  
  displayedColumns: string[] = ['id', 'grupo', 'usuarios', 'userGrupoActions', 'permissoes', 
      'permissaoGrupoActions', 'permissoesActions' ];
  @ViewChild(MatPaginator) paginator : MatPaginator;
  @ViewChild(MatSort) sort : MatSort;
  waitingResponse: boolean = true;
  temDados: boolean = false;
  grupos: GrupoModel[] = [];
  dataSource: MatTableDataSource<GrupoModel>;
  usuarioSelecionado : UserDTO = { nome: '', id: 0  };
  nomeGrupoSeleicionadoAssociacao: string = '';
  permissaoSelecionada: PermissaoModel = { id : 0, nome : '' };
  erroNaoOcorreu: boolean = false;
  permissaoAtualizar: PermissaoModel = {nome : '', descricao : ''}

  constructor(private sidebarService: SiderbarService,
    private swal: SwalService,
    private grupoPermissaoEndpontService: GrupoPermissoesEndpointService,
    private usuarioGrupoEndpointService: UsuarioGrupoEndpointService,
    private usuarioEndpointService: UserEndPointService,
    private permissaoEndpoint: PermissaoEndpointService,
    private router: Router,
    private dialog: MatDialog) { 
      this.sidebarService.sidebarData = { page : 'associar-usuario-perimissao-grupo'}
      this.dataSource = new MatTableDataSource(this.grupos);
  }

  ngOnInit(): void {
    this.grupoPermissaoEndpontService.listar()
   .toPromise()
   .then(resp =>{
     resp._embedded.grupos.forEach(grupo => {   
       let permissoes = [];
       let usuarios = [];
       this.grupoPermissaoEndpontService.listarPermissoesNaoVinculadaGrupo(grupo.id)
       .toPromise()
       .then(resp => {
         resp._embedded.permissoes.forEach(permissaoResp => {
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
       this.usuarioEndpointService.listarUsuariosNãoVinculadosAoGrupo(grupo.id)
       .toPromise()
       .then(resp =>{
         resp._embedded.usuarios.forEach(userResp =>{
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

  associarUsuario (grupoId : number) {
    if (this.usuarioSelecionado?.id === 0) {
      this.swal.objetoNaoSelecionado("Por favor selecione um usuário.");
      return;
    }
    this.swal.esperandoProcesso("Aguarde por favor.");
    this.usuarioGrupoEndpointService.associarGrupoUsuario(this.usuarioSelecionado.id, grupoId)
      .toPromise()
      .then(() =>{
        this.swal.fecharSwalLoading();
        this.swal.sucessoSemRetorno(`Usuário ${this.usuarioSelecionado.nome} 
          foi associado ao Grupo ${this.nomeGrupoSeleicionadoAssociacao}`);
        this.erroNaoOcorreu = true;
      })
      .catch(erro =>{
        this.swal.erroSalvarEditarObjeto(erro)
      })
      .finally(() =>{
        if (this.erroNaoOcorreu){
          this.usuarioSelecionado = { id: 0, nome: '' }
          setTimeout(this.limpaGrupoSelecionadoReloadPage, 4000)
        }
      })
  }

  associarPermissaoGrupo(grupoId: number){
    if( this.permissaoSelecionada.id === 0){
      this.swal.objetoNaoSelecionado("Por favor selecione uma permissão.");
      return;
    }
    this.swal.esperandoProcesso("Por favor aguarde.");
    this.grupoPermissaoEndpontService.associarGrupoPermissao(grupoId, this.permissaoSelecionada.id)
      .toPromise()
      .then( () => {
        this.swal.fecharSwalLoading()
        this.swal.sucessoSemRetorno(`Permissão, ${this.permissaoSelecionada.nome}, foi associada ao 
          ${this.nomeGrupoSeleicionadoAssociacao} com sucesso.`)
          this.erroNaoOcorreu = true;
      })
      .catch(erro =>{
        this.swal.erroSalvarEditarObjeto(erro)
      })
      .finally( () => {
        if (this.erroNaoOcorreu) {
          this.permissaoSelecionada = { id : 0, nome : ''}
          this.limpaGrupoSelecionadoReloadPage();
        }
      })
  }

  atualizarPermissao(){
    this.swal.esperandoProcesso('Por favor aguarde');
    this.permissaoAtualizar = {nome: this.permissaoSelecionada.nome, descricao: this.permissaoSelecionada.descricao}
    this.permissaoEndpoint.atualizar(this.permissaoSelecionada.id, this.permissaoAtualizar)
      .toPromise()
      .then(resp => {
        this.swal.fecharSwalLoading();
        this.swal.sucesso(`Permissao (${resp.nome}) atualizada.`);
        window.location.reload();
      }).catch(erro => {
        this.swal.erroSalvarEditarObjeto(erro);
      })
      .finally( () => {
        this.permissaoSelecionada = {id: 0, nome: '', descricao: ''};
      })
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


  irPermissoes(){
    this.router.navigateByUrl( "permissoes");
  }

  limpaGrupoSelecionadoReloadPage(){
    this.nomeGrupoSeleicionadoAssociacao = '';
    window.location.reload();
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
      this.atualizarPermissao();
    });
  }

  selectPermissao (event: Event) {
    this.permissaoSelecionada.id = Number((event.target as HTMLSelectElement).value)
    this.dataSource.data.forEach(grupo =>{
      grupo.permissoes.forEach(permissao =>{
        if (permissao.id === this.permissaoSelecionada.id){
          this.permissaoSelecionada.nome = permissao.nome;
          this.permissaoSelecionada.descricao = permissao.descricao;
          this.nomeGrupoSeleicionadoAssociacao = grupo.nome;
        }
      })
    })
  }

  selectUsuario (event: Event) {
    this.usuarioSelecionado.id = Number((event.target as HTMLSelectElement).value)
    this.dataSource.data.forEach(grupo =>{
      grupo.usuarios.forEach(usuario =>{
        if(usuario.id === this.usuarioSelecionado.id){
          this.usuarioSelecionado.nome = usuario.nome;
          this.nomeGrupoSeleicionadoAssociacao = grupo.nome
        }
      })
    })
  }
}
