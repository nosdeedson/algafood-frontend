import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { CozinhaEndpointService } from 'src/app/backend/cozinha-endpoint.service';
import { HeaderService } from 'src/app/components/template/header/header.service';
import { SiderbarService } from 'src/app/components/template/sidebar/siderbar.service';
import { CozinhaDTO } from 'src/app/model/cozinha/cozinha-model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listar-cozinhas',
  templateUrl: './listar-cozinhas.component.html',
  styleUrls: ['./listar-cozinhas.component.css']
})
export class ListarCozinhasComponent implements OnInit {

  displayedColumns: string[] = ['id', 'nome', 'Actions' ];
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort : MatSort;

  dataSource: MatTableDataSource<CozinhaDTO>;
  cozinhas : CozinhaDTO[] = [];
  cozinha : CozinhaDTO = {};
  constructor(
    private router: Router,
    private cozinhaEndpointService : CozinhaEndpointService,
    private changeDetectorRef: ChangeDetectorRef,
    private sidebarService: SiderbarService,
    private header: HeaderService) {
      this.sidebarService.sidebarData = { page: 'listar-cozinhas' };
      this.header.headerData = { icon: 'kitchen', title: 'Cozinhas'}
  }

  input: any = {
    value: ''
  }

  temDados : boolean;
  waitingResponse: boolean = true;

  ngOnInit(): void {
    this.waitingResponse = true;
    this.cozinhaEndpointService.listar()
      .toPromise()
      .then(resp =>{
        resp._embedded.cozinhas.forEach(element => {
          this.cozinha ={
            id : element.id,
            nome: element.nome
          }
          this.cozinhas.push(this.cozinha)
        });
        this.dataSource = new MatTableDataSource(this.cozinhas)
        this.changeDetectorRef.detectChanges()
        this.dataSource.paginator = this.paginator
        this.dataSource.sort = this.sort
        this.temDados = true;
        this.waitingResponse = false
      })
      .catch(e =>{
        if (e.error.status === 401) {
          Swal.fire({
            title: 'Erro',
            icon: 'error',
            text: e.error.detail
          })
          this.router.navigateByUrl('/')
        } else {
          Swal.fire({
            title: 'Erro',
            icon: 'error',
            text: e.error.detail
          })
        }
      })
  }
      
  ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  adicionar(){
      this.router.navigateByUrl('adicionar-cozinha')
  }

  deletar(cozinha: CozinhaDTO){
    this.cozinhaEndpointService.delete(cozinha.id)
      .toPromise()
      .then(resp => {
        Swal.fire({
          title: 'Sucesso',
          icon: 'success',
          text: 'Cozinha deletada com sucesso.'
        })
        this.ngOnInit();
      })
      .catch(e =>{
        Swal.fire({
          title: "Erro",
          icon: 'error',
          text: e.error.detail
        })
      })
  }

  editar(cozinha: CozinhaDTO){
    this.router.navigateByUrl("adicionar-cozinha", {
      state: {cozinha : cozinha}
    })
  }

}

