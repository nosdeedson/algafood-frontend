import { Component, OnInit } from '@angular/core';
import { CidadeEndpointService } from 'src/app/backend/cidade-endpoint.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-listar-cidades',
  templateUrl: './listar-cidades.component.html',
  styleUrls: ['./listar-cidades.component.css']
})
export class ListarCidadesComponent implements OnInit {

  listaDeCidade : boolean = false;
  waitingRequest : boolean = true
  displayedColumns: string[] = ['Id', 'Nome'];
  dataSource : any[] = [];

  constructor(private cidadeEndpoint: CidadeEndpointService) { }

  ngOnInit(): void {
    this.listaDeCidade = false;
    this.cidadeEndpoint.listar()
      .toPromise()
      .then(resp =>{
        this.dataSource = resp.content
        console.log(this.dataSource)
        if( this.dataSource.length > 0){
          this.listaDeCidade = true
        }
        this.waitingRequest = false;
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
