import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import {  Router } from '@angular/router';
import { UserEndPointService } from 'src/app/backend/user-end-point-service.service';
import { SwalService } from 'src/app/helper/swal/swal.service';
import { UserDTO } from 'src/app/model/user/user-model';
import { MyErrorStateMatcher } from '../criar-editar-cidade/criar-editar-cidade.component';
import { HeaderService } from '../template/header/header.service';
import { SiderbarService } from '../template/sidebar/siderbar.service';

@Component({
  selector: 'app-criar-editar-usuario',
  templateUrl: './criar-editar-usuario.component.html',
  styleUrls: ['./criar-editar-usuario.component.css']
})
export class CriarEditarUsuarioComponent implements OnInit {

  senhaDiferente: boolean = false;
  edicao: boolean = false;
  generos: string[] = ["F", "M"];

  @ViewChild('formUser')  formUser: NgForm;
  matcher = new MyErrorStateMatcher();

  user: UserDTO ={
    nome : '',
    email: '',
    senha: '',
    confirmeSenha : '',
    genero: ''
  }

  userSalvar : UserDTO = null;
  userId: any;
  constructor(private userEndPoint: UserEndPointService,
    private router: Router,
    private header: HeaderService,
    private sidebarService: SiderbarService,
    private swal: SwalService) {
      if( this.router.getCurrentNavigation().extras.state !== undefined ){
        this.user = this.router.getCurrentNavigation().extras.state.user;
        this.edicao= true;
        this.header.headerData = { icon: 'people', title: 'Criar/Editar usuário'};
        this.sidebarService.sidebarData = { page: 'criar-editar-usuario'}
      }
    }

  ngOnInit(): void {
  }

  async editar(){
    this.userSalvar= {
      nome: this.user.nome,
      email: this.user.email
    }
    await this.userEndPoint.editar(this.userSalvar, this.user.id)
      .toPromise()
      .then(resp =>{
        this.swal.sucessoSemRetorno("Usuário editado com sucesso.")
        this.router.navigateByUrl('listar-usuarios')
      })
      .catch(e =>{
        this.swal.erroSalvarEditarObjeto(e);
      })
  }

  async salvar(){
    if( this.user.confirmeSenha !== this.user.senha){
      this.senhaDiferente = true
      return
    }
    this.userSalvar = {
      nome: this.user.nome,
      email: this.user.email,
      senha: this.user.senha,
      genero: this.user.genero
    }
    await this.userEndPoint.salvar(this.userSalvar)
      .toPromise()
      .then(resp =>{
        this.swal.sucesso(`Usuário ${resp.email} salvo com sucesso.`)
        this.router.navigateByUrl('listar-usuarios')
      })
      .catch(e =>{
        this.swal.erroSalvarEditarObjeto(e);
      })
  }


}
