import { Component, OnInit } from '@angular/core';
import { UserEndPointService } from 'src/app/backend/user-end-point-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listar-usuarios',
  templateUrl: './listar-usuarios.component.html',
  styleUrls: ['./listar-usuarios.component.css']
})
export class ListarUsuariosComponent implements OnInit {

  usuarios : any;

  constructor( private userEndPoint: UserEndPointService) { }

  ngOnInit(): void {
    this.userEndPoint.listar()
      .toPromise()
      .then(resp =>{
        this.usuarios = resp;
      })
      .catch(error =>{
        console.log(error)
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.error.detail
        })
      })
  }

}
