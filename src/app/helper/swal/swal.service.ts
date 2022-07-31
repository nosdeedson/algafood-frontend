import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class SwalService {

  constructor(private router: Router) {  }

  async confirmacao(msg: string): Promise<boolean>{
    let deletar = false;
    await Swal.fire({
      title: `Deletar: ${msg}, você tem certeza?`,
      icon: 'question',
      text: 'Você não vai poder reverter isto.',
      showCancelButton: true,
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, deletar',
      confirmButtonColor: '#3085d6',
      allowOutsideClick: false,
      heightAuto: false
    }).then( result => {
      deletar = result.isConfirmed.valueOf();
    })
    return deletar;
  }

  confimarDelecao(msg : string){
    Swal.fire({
      title: 'Deletado',
      icon: 'success',
      allowOutsideClick: false,
      heightAuto: false,
      text: `${msg} deletado.`,
    })
  }

  erroCarregarPagina(erro: any) {
    if (erro.error != null || erro.error != undefined) {
      if (erro.error.status === 401) {
        Swal.fire({
          title: 'Erro',
          icon: 'error',
          text: erro.error.detail,
          heightAuto: false,
        })
        this.router.navigateByUrl('/')
      } else {
        Swal.fire({
          title: 'Erro',
          icon: 'error',
          text: erro.error.detail,
          heightAuto: false,
        })
      }
    }
  }

  esperandoProcesso(msg: string){
    Swal.fire({
      title: 'Processando',
      text: msg,
      icon: 'info',
      allowOutsideClick: false,
      heightAuto: false,
    })
    Swal.showLoading();
  }

  erroSalvarEditarObjeto(erro: any){
    Swal.fire({
      title: 'Erro',
      icon: 'error',
      text: erro.error.detail,
      showCloseButton: true,
      heightAuto: false,
    })
  }

  fecharSwalLoading(){
    Swal.close();
  }

  objetoNaoSelecionado(msg: string){
    Swal.fire({
      title: 'Selecionar',
      icon: 'info',
      text: msg,
      heightAuto: false,
    })
  }

  redirecionamento(msg: string){
    Swal.fire({
      title: 'Redirecionado',
      icon: 'info',
      text: msg,
      heightAuto: false,
      timer: 4000
    })
  }

  sucessoSemRetorno(msg: string){
    Swal.fire({
      title: 'Sucesso',
      icon: 'success',
      text: msg,
      timer: 4000,
      heightAuto: false,
    })
  }

  sucesso(msg: string){
    Swal.fire({
      title: 'Sucesso',
      icon: 'success',
      text: msg,
      timer: 4000,
      showCloseButton: true,
      heightAuto: false,
    })
  }

}
