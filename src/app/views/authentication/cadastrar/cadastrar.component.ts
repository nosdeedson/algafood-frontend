import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HeaderService } from 'src/app/components/template/header/header.service';
import { UserDTO } from 'src/app/model/user/user-model';

import { UserEndPointService } from 'src/app/backend/user-end-point-service.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.component.html',
  styleUrls: ['./cadastrar.component.css']
})
export class CadastrarComponent implements OnInit {

  senhaDiferente: boolean = false;
  constructor(private headerService : HeaderService,
    private userEndPoint: UserEndPointService,
    private router : Router) {
    this.headerService.headerData = {
      title: 'Cadastrar',
      icon: 'person_add'
    }
   }

   @ViewChild('formUser')  formUser: NgForm

   user: UserDTO ={
     nome : '',
     email: '',
     senha: '',
     confirmeSenha : ''
   }

   userSalvar : UserDTO = null;

  ngOnInit(): void {
    
  }

  async salvar() {
    if (this.user.confirmeSenha !== this.user.senha) {
      this.senhaDiferente = true;
      return;
    }

    this.userSalvar = {
      nome: this.user.nome,
      email: this.user.email,
      senha: this.user.senha
    }

   await this.userEndPoint.salvar(this.userSalvar)
      .toPromise()
      .then(resp => {
        console.log(resp)
        Swal.fire({
          position: 'top',
          icon: 'success',
          title: 'Usuário ' + resp.email + ' salvo com sucesso',
          showConfirmButton: false,
          timer: 2000
        });
        this.router.navigate(['/']);
      })
      .catch(e => {
        console.log(e)
        Swal.fire({
          title: 'Error!',
          text: 'Falha ao salvar o usuário',
          icon: 'error',
          confirmButtonText: 'Ok'
        })
      });
  }

}
