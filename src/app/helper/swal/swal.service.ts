import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class SwalService {

  constructor(private router: Router) { }

  erroCarregarPagina(erro: any){
    if (erro.error.status === 401) {
      Swal.fire({
        title: 'Erro',
        icon: 'error',
        text: erro.error.detail
      })
      this.router.navigateByUrl('/')
    } else {
      Swal.fire({
        title: 'Erro',
        icon: 'error',
        text: erro.error.detail
      })
    }
  }

  objetoNaoSelecionado(msg: string){
    Swal.fire({
      title: 'Selecionar',
      icon: 'info',
      text: msg
    })
  }

  sucessoSemRetorno(msg: string){
    Swal.fire({
      title: 'Sucesso',
      icon: 'success',
      text: msg,
      timer: 3000
    })
  }


}
