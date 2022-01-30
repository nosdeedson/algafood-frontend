import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HeaderService } from 'src/app/components/template/header/header.service';
import { UserDTO } from 'src/app/model/user/user-model';

import {} from '@fortawesome/angular-fontawesome'
import { UserEndPointServiceService } from 'src/app/backend/user-end-point-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.component.html',
  styleUrls: ['./cadastrar.component.css']
})
export class CadastrarComponent implements OnInit {

  senhaDiferente: boolean = false;

  constructor(private headerService : HeaderService,
    private userEndPoint: UserEndPointServiceService,
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
     confirmeSenha: ''
   }

  ngOnInit(): void {
    
  }

  salvar(){
    if( this.user.confirmeSenha !== this.user.senha){
      this.senhaDiferente = true;
      return;
    }

    this.userEndPoint.salvar(this.user)
        .toPromise()
        .then( resp => console.log(resp))
        .catch(e => console.log(e));
    
    this.router.navigate(['/'])

    this.userEndPoint.getEndPoints()
        .toPromise()
        .then(e => console.log(e))
  }

}
