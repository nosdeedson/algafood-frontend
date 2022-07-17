import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UserDTO } from 'src/app/model/user/user-model';
import { MeuPerfilComponent } from '../../modais/meu-perfil/meu-perfil.component';
import { HeaderService } from './header.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private headerService: HeaderService,
    private router: Router,
    private dialog: MatDialog) {  }

  ngOnInit(): void { 
    if ( this.router.routerState.snapshot.url !== '/' ){
      this.headerService.user = JSON.parse(sessionStorage.getItem('user'));
    }else{
      this.headerService.user = null
    }
  }

  get title(): string{
    return this.headerService.headerData.title
  }

  get icon() : string{
    return this.headerService.headerData.icon
  }

  get usuarioNome() : string {
    return this.headerService.user.nome
  }

  get genero(): string {
    return this.headerService.user.genero
  }

  get user(): UserDTO {
    return this.headerService.user
  }

  openDialog(): void {
    alert('teste')
    const dialogRef = this.dialog.open(MeuPerfilComponent, {
      width: '250px',
      data: '',
    });

    dialogRef.afterClosed().subscribe(result => {
      this.acao();
    });
  }

  acao(){
    console.log('acoes')
  }

  sair(){
    sessionStorage.removeItem('user');
    this.router.navigateByUrl('/')
  }


}
