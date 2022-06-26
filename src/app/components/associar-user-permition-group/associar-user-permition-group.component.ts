import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { GrupoPermissoesEndpointService } from 'src/app/backend/grupo-permissoes-endpoint.service';
import { UsuarioGrupoEndpointService } from 'src/app/backend/usuario-grupo-endpoint.service';
import { SwalService } from 'src/app/helper/swal/swal.service';
import { GrupoModel } from 'src/app/model/grupo/grupo-model';

@Component({
  selector: 'app-associar-user-permition-group',
  templateUrl: './associar-user-permition-group.component.html',
  styleUrls: ['./associar-user-permition-group.component.css']
})
export class AssociarUserPermitionGroupComponent implements OnInit {
  
  displayedColumns: string[] = ['id', 'grupo', 'userGrupoActions', 'usuarios', ];
  @ViewChild(MatPaginator) paginator : MatPaginator;
  @ViewChild(MatSort) sort : MatSort;
  waitingResponse: boolean = true;
  temDados: boolean = false;
  grupos: GrupoModel[] = [];
  dataSource: MatTableDataSource<GrupoModel>;
  usuarioSelecionado : number = 0;
  permissaoSelecionada: number = 0;
  constructor(private swal: SwalService,
    private grupoPermissaoEndpontService: GrupoPermissoesEndpointService,
    private usuarioGrupoEndpointService: UsuarioGrupoEndpointService) { 
    this.dataSource = new MatTableDataSource(this.grupos);
  }

  ngOnInit(): void {
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
     console.log(this.dataSource.data)
     this.dataSource.paginator = this.paginator
     this.dataSource.sort = this.sort
     this.waitingResponse = false;
     this.temDados = true;
   })
   .catch(erro =>{
     this.swal.erroCarregarPagina(erro)
   })
  
  }
  
  selectPermissao(event: Event){
    this.permissaoSelecionada = Number((event.target as HTMLSelectElement).value)
  }

  selectUsuario(event: Event){
    this.usuarioSelecionado = Number((event.target as HTMLSelectElement).value)
  }

}
