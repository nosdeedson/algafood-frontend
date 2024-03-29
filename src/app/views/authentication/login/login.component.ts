import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginServiceService } from 'src/app/backend/login-service.service';
import { HeaderService } from 'src/app/components/template/header/header.service';
import { SwalService } from 'src/app/helper/swal/swal.service';
import { User } from 'src/app/model/user/user';
import { UserDTO } from 'src/app/model/user/user-model';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: UserDTO = {
    email : '',
    senha : ''
  }

  usuario : User = {
    Authorities : [],
    token : ''
  };

  constructor( private headerService: HeaderService,
    private router : Router,
    private swal: SwalService,
    private loginEndpoint: LoginServiceService) {
    headerService.headerData = {
      title: 'Login',
      icon: 'login'
    }
   }

  ngOnInit(): void {  }

  login(){
    this.loginEndpoint.login(this.user)
      .toPromise()
      .then(resp => {
        this.usuario.Authorities = resp.Authorities;
        this.usuario.token = resp.token;
        this.usuario.nome = resp.nome;
        this.usuario.genero = resp.genero;
        this.usuario.id = resp.id;
        sessionStorage.setItem('user', JSON.stringify(this.usuario))
        this.usuario = JSON.parse(sessionStorage.getItem('user'))
        this.router.navigateByUrl('/home')
      })
      .catch(e => {
        if ( e.status === 0 ){
          this.swal.erroLoginServidorDown();
        }else{
          this.swal.errorLoginInvalido(e)
        }
      })
  }

}
