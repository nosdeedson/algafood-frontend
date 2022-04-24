import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserEndPointService } from 'src/app/backend/user-end-point-service.service';
import { UserDTO } from 'src/app/model/user/user-model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-criar-editar-usuario',
  templateUrl: './criar-editar-usuario.component.html',
  styleUrls: ['./criar-editar-usuario.component.css']
})
export class CriarEditarUsuarioComponent implements OnInit {

  senhaDiferente: boolean = false;
  edicao: boolean = false;

  @ViewChild('formUser')  formUser: NgForm

  user: UserDTO ={
    nome : '',
    email: '',
    senha: '',
    confirmeSenha : ''
  }

  userSalvar : UserDTO = null;
  userId: any;
  constructor(private userEndPoint: UserEndPointService,
    private router: Router,) {
      if( this.router.getCurrentNavigation().extras.state !== undefined ){
        this.user = this.router.getCurrentNavigation().extras.state.user;
        this.edicao= true;
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
        Swal.fire({
          icon: 'success',
          title: 'Usuário ' + resp.email + ' atualizado com sucesso.',
          timer: 3000
        })
        this.router.navigateByUrl('listar-usuarios')
      })
      .catch(e =>{
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: e.error.detail,
          showConfirmButton: true,
          timer: 4000
        })
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
      senha: this.user.senha
    }

    await this.userEndPoint.salvar(this.userSalvar)
      .toPromise()
      .then(resp =>{
        Swal.fire({
          icon: 'success',
          title: 'Usuário ' + resp.email + ' salvo com sucesso.',
          timer: 3000
        });
        this.router.navigateByUrl('listar-usuarios')
      })
      .catch(e =>{
        console.log(e)
        Swal.fire({
          title: 'Error!',
          text: e.error.detail,
          icon: 'error',
          showConfirmButton: true,
          timer: 4000
        })
      })
  }


}
