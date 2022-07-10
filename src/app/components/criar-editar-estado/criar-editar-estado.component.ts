import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { EstadoEndpointService } from 'src/app/backend/estado-endpoint.service';
import { SwalService } from 'src/app/helper/swal/swal.service';
import { EstadoDTO } from 'src/app/model/estado/estado-model';
import Swal from 'sweetalert2';
import { HeaderService } from '../template/header/header.service';


@Component({
  selector: 'app-criar-editar-estado',
  templateUrl: './criar-editar-estado.component.html',
  styleUrls: ['./criar-editar-estado.component.css']
})
export class CriarEditarEstadoComponent implements OnInit {

  @ViewChild('formEstado') formEstado: NgForm

  constructor(
    private estadoEndpointService: EstadoEndpointService,
    private router: Router,
    private swal: SwalService,
    private headerService: HeaderService) {
      this.headerService.headerData = {icon: 'location_city', title: 'Criar/Editar estado'} 
      if( this.router.getCurrentNavigation().extras.state !== undefined ){
        this.estado = this.router.getCurrentNavigation().extras.state.estado
        this.edicao = true;
      }
    }
  edicao: boolean = false

  estado: EstadoDTO = {
    nome: ''
  }

  estadoEditar : EstadoDTO;

  ngOnInit(): void {
  }

  
  editar(){
    this.estadoEditar = {
      nome : this.estado.nome
    }
    this.estadoEndpointService.editar(this.estadoEditar, this.estado.id)
        .toPromise()
        .then( resp =>{
          Swal.fire({
            icon: 'success',
            title: 'Sucesso',
            text: 'Estado editado com sucesso',
            timer: 3000
          })
          this.router.navigateByUrl('listar-estados')
        })
        .catch(e =>{
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: e.error.detail,
            timer: 3000
          })
        })
  }

  salvar(){
    this.estadoEndpointService.salvar(this.estado)
          .toPromise()
          .then(resp =>{
            Swal.fire({
              icon: 'success',
              title: 'Sucesso!',
              text: 'Estado salvo',
              timer: 3000,
            })
            this.router.navigateByUrl('listar-estados')
          })
          .catch(e =>{
            Swal.fire({
              icon: 'error',
              title: 'Erro',
              text: e.error.detail
            })
          })
  }

}
