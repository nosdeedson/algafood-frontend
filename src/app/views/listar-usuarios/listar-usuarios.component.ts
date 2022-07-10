import { isNgTemplate } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserEndPointService } from 'src/app/backend/user-end-point-service.service';
import { HeaderService } from 'src/app/components/template/header/header.service';
import { SiderbarService } from 'src/app/components/template/sidebar/siderbar.service';
import { UserDTO } from 'src/app/model/user/user-model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listar-usuarios',
  templateUrl: './listar-usuarios.component.html',
  styleUrls: ['./listar-usuarios.component.css']
})


export class ListarUsuariosComponent implements OnInit {

  displayedColumns: string[] = [ 'Id', 'Nome', 'Email', 'Ações'];
  dataSource: any[] = [];
  usuarios: any[];
  user: UserDTO;
  listaDeUsuarios : boolean = false;
  waitingResonse : boolean = true;
  constructor( private userEndPoint: UserEndPointService ,
    private router: Router,
    private sidebarService: SiderbarService,
    private header: HeaderService) {
      this.header.headerData = { icon: 'people', title: 'Usuários' }
      this.sidebarService.sidebarData = { page: 'listar-usuarios'}
     }

  ngOnInit(): void {
    this.listaDeUsuarios = false;
    this.userEndPoint.listar()
      .toPromise()
      .then(resp =>{
        this.dataSource = resp._embedded.usuarios;
        this.listaDeUsuarios = true;
        this.waitingResonse = false;
      })
      .catch(error =>{
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.error.detail
        })
        this.listaDeUsuarios = false
      })
  }

  editar(user: UserDTO){
    this.router.navigateByUrl('editar-usuario', {
      state: { user: user}
    })
  }

  async deletar(user: UserDTO){
    await this.userEndPoint.deletar(user.id)
      .toPromise()
      .then( () =>{
        Swal.fire({
          icon: 'success',
          title: 'Usuário deletado com sucesso.',
          timer: 3000
        })
      })
      .catch(e =>{
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: e,
          showConfirmButton: true,
          timer: 4000
        })
      })
  }

  criarUsuario(){
    this.router.navigateByUrl('adicionar-usuario')
  }

}
