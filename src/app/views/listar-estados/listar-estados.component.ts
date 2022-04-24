import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { timer } from 'rxjs';
import { EstadoEndpointService } from 'src/app/backend/estado-endpoint.service';
import { EstadoDTO } from 'src/app/model/estado/estado-model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listar-estados',
  templateUrl: './listar-estados.component.html',
  styleUrls: ['./listar-estados.component.css']
})
export class ListarEstadosComponent implements OnInit {

  constructor(
    private estadoEndpointService: EstadoEndpointService,
    private router: Router
    ) { }

  waitingResponse : boolean = true;
  dataSource : any[] = [];
  displayedColumns: string[] = ['Id', 'Nome', 'Ações']
  ngOnInit(): void {
    this.waitingResponse = true;
    this.estadoEndpointService.listar()
        .toPromise()
        .then(resp =>{
          this.waitingResponse =false
          this.dataSource = resp._embedded.estados
        })
        .catch(error =>{
          this.waitingResponse = false;
          Swal.fire({
            icon: 'error',
            title: 'Erro!',
            text: error.error.detail
          })
        })
  }

  adicionarEstado(){
    this.router.navigateByUrl('adicionar-estado')
  }

  editar(estado: EstadoDTO){
    this.router.navigateByUrl('editar-estado', {
      state: { estado: estado }
    })
  }

  deletar(estado: EstadoDTO){
    this.estadoEndpointService.deletar(estado.id)
          .toPromise()
          .then(resp =>{
            console.log(resp)
            Swal.fire({
              icon: 'success',
              title: 'Sucesso',
              text: 'Estado deletado com sucesso.',
              timer: 3000
            })
            this.ngOnInit();
          })
          .catch(e =>{
            Swal.fire({
              icon: 'error',
              title: 'Erro',
              text: e.error.detail,
              timer: 3000
            })
          })
  }

}
