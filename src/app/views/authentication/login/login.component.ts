import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginServiceService } from 'src/app/backend/login-service.service';
import { HeaderService } from 'src/app/components/template/header/header.service';
import { UserDTO } from 'src/app/model/user/user-model';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
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

  usuario : any;

  constructor( private headerService: HeaderService,
    private router : Router,
    private loginEndpoint: LoginServiceService) {
    headerService.headerData = {
      title: 'Login',
      icon: 'login'
    }
   }

  ngOnInit(): void {

  }

  login(){
    this.loginEndpoint.login(this.user)
      .toPromise()
      .then(resp => {
        this.usuario = resp;
        environment.token = this.usuario.token;
        this.router.navigateByUrl('/home')
      })
      .catch(e => {
        console.log(e)
        Swal.fire({
          icon: 'error',
          title: 'error!',
          text: e.error.message,
          showLoaderOnConfirm: true,
          timer: 4000
        })
      })
  }

  testeRoot(){
    this.loginEndpoint.testeRoot()
      .toPromise().then(resp =>{
        console.log(resp)
      })
      .catch( error =>{
        Swal.fire({
          icon: 'error',
          title: 'error!',
          showLoaderOnConfirm: true,
          timer: 4000
        })
      })
  }

}
