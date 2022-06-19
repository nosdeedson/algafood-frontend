import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { timer } from 'rxjs';
import { CidadeEndpointService } from 'src/app/backend/cidade-endpoint.service';
import { CidadeDTO } from 'src/app/model/cidade/cidade-model';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-listar-cidades',
  templateUrl: './listar-cidades.component.html',
  styleUrls: ['./listar-cidades.component.css']
})
export class ListarCidadesComponent implements OnInit {

  listaDeCidade : boolean = false;
  waitingRequest : boolean = true
  displayedColumns: string[] = ['Id', 'Nome', 'Ações'];
  dataSource : any[] = [];
  adicionar: boolean = false;

  constructor(private cidadeEndpoint: CidadeEndpointService,
    private router: Router) { }

  ngOnInit(): void {
    this.adicionar = false;
    this.listaDeCidade = false;
    this.cidadeEndpoint.listar()
      .toPromise()
      .then(resp =>{
        this.dataSource = resp.content
        if( this.dataSource.length > 0){
          this.listaDeCidade = true
        }
        this.waitingRequest = false;
      })
      .catch(e =>{
        this.waitingRequest = false
        Swal.fire({
          icon: 'error',
          title: 'Erro',
          text: e.error.detail
        })
      })

  }

  adicionarCidade(){
    this.router.navigateByUrl('editar-cidade')
  }

  editar(cidade: CidadeDTO){
    this.router.navigateByUrl('editar-cidade', {
      state: {cidade: cidade}
    })
  }

  deletar(cidade: CidadeDTO){
    this.cidadeEndpoint.deletar(cidade.id)
        .toPromise()
        .then( resp =>{
          Swal.fire({
            icon: 'success',
            title: 'Sucesso',
            text: "Cidade deletada com sucesso.",
            timer: 3000
          })
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

}
