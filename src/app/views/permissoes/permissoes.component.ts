import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { GrupoPermissoesEndpointService } from 'src/app/backend/grupo-permissoes-endpoint.service';
import { UsuarioGrupoEndpointService } from 'src/app/backend/usuario-grupo-endpoint.service';
import { SwalService } from 'src/app/helper/swal/swal.service';
import { GrupoModel } from 'src/app/model/grupo/grupo-model';

@Component({
  selector: 'app-permissoes',
  templateUrl: './permissoes.component.html',
  styleUrls: ['./permissoes.component.css']
})
export class PermissoesComponent implements OnInit, AfterViewInit{

  // firstTable
  displayedColumns: string[] = ['id', 'grupo', 'userGrupoActions', 'usuarios', 'grupoPermissoesActions', 'permissoes', 'permissoesActions'];
  @ViewChild(MatPaginator) paginator : MatPaginator;
  @ViewChild(MatSort) sort : MatSort;
  permissoesForm = new FormControl();
  usuariosForm = new FormControl();
  waitingResponse: boolean = true;
  temDados: boolean = false;
  grupos: GrupoModel[] = [];
  dataSource: MatTableDataSource<GrupoModel>;
  usuarioSelecionado : number = 0;
  permissaoSelecionada: number = 0;

  constructor(private router: Router,
    private grupoPermissaoEndpontService : GrupoPermissoesEndpointService,
    private usuarioGrupoEndpointService: UsuarioGrupoEndpointService,
    private swal: SwalService) {
      this.dataSource = new MatTableDataSource(this.grupos);
    }

  ngAfterViewInit(): void {
  }

  ngOnInit(): void {
   this.carregarGrupoPermissaoUsuarioAssociados();
  }

  associarUserPermitionGroup(){
    this.router.navigateByUrl('associar-usuario-perimissao-grupo')
  }

  carregarGrupoPermissaoUsuarioAssociados(){
    this.grupoPermissaoEndpontService.listar()
   .toPromise()
   .then(resp =>{
     resp._embedded.grupos.forEach(grupo => {   
       let permissoes = [];
       let usuarios = [];
       this.grupoPermissaoEndpontService.listarPermissoesPorGrupoId(grupo.id)
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
       this.grupoPermissaoEndpontService.listarUsuariosPorGrupoId(grupo.id)
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

  deletar(grupo){
    alert(grupo)
  }

  desassociarGrupoPermissao(grupoId: number){
    if(this.permissaoSelecionada === 0){
      this.swal.objetoNaoSelecionado('Nenhuma permissão selecionada, selecione por favor.');
    }else{
      this.grupoPermissaoEndpontService.desassociarGrupoPermissao(grupoId, this.permissaoSelecionada)
        .toPromise()
        .then(resp =>{
          this.swal.sucessoSemRetorno('Permissão desassociada do Grupo.')
          this.permissaoSelecionada = 0;
          this.carregarGrupoPermissaoUsuarioAssociados();
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
          this.carregarGrupoPermissaoUsuarioAssociados()
        })
        .catch(erro =>{
          console.log(erro)
          this.swal.erroCarregarPagina(erro);
        })
    }
  }

  editarUserGrupo(idGrupo: number){
    alert(this.usuarioSelecionado + " grupo " + idGrupo)
  }

  editarPermissaoGrupo(idGrupo : number){
    alert(this.permissaoSelecionada + ' grupo ' + idGrupo)
  }

  selectPermissao(event: Event){
    this.permissaoSelecionada = Number((event.target as HTMLSelectElement).value)
  }

  selectUsuario(event: Event){
    this.usuarioSelecionado = Number((event.target as HTMLSelectElement).value)
  }

  navegarAdicionar() {
    this.router.navigateByUrl("/adicionar-permissao")
  }

}
