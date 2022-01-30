import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderService } from 'src/app/components/template/header/header.service';
import { UserDTO } from 'src/app/model/user/user-model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: UserDTO = {
    email : 'teste@email',
    senha : '123'
  }

  constructor( private headerService: HeaderService,
    private router : Router) {
    headerService.headerData = {
      title: 'Login',
      icon: 'login'
    }
   }

  ngOnInit(): void {

  }

  login() : void{
    if( this.user.email === 'teste@email' && this.user.senha === '123' ){
      this.router.navigate(['home'])
    }else{
      alert('usuario e senha invalido')
    }
  }

}
