import { Component, OnInit } from '@angular/core';
import { ControlContainer, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CidadeEndpointService } from 'src/app/backend/cidade-endpoint.service';
import { SwalService } from 'src/app/helper/swal/swal.service';
import { CidadeDTO } from 'src/app/model/cidade/cidade-model';

@Component({
  selector: 'app-form-endereco',
  templateUrl: './form-endereco.component.html',
  styleUrls: ['./form-endereco.component.css']
})
export class FormEnderecoComponent implements OnInit {

  cidades: CidadeDTO[] = [];
  id: number = 0;

  constructor(private cidadeEndpoint: CidadeEndpointService,
    private controlContainer: ControlContainer,
    private _formBuilder: FormBuilder,
    private router: Router,
    private swal: SwalService) { }

  formEndereco = this._formBuilder.group({
    bairro: ['', Validators.required],
    cep: ['', Validators.required],
    logradouro: ['', Validators.required],
    numero: ['', Validators.required],
    complemento: [''],
    idCidade: [this.id, Validators.required],
  });

  ngOnInit(): void {
    this.formEndereco = <FormGroup>this.controlContainer.control
    this.cidadeEndpoint.listar()
      .toPromise()
      .then(resp => {
        resp.content.forEach(cidade => {
          let city = {
            id: cidade.id,
            nome: cidade.nome
          }
          this.cidades.push(city)
        })
      })
      .catch(erro => {
        this.swal.erroCarregarPagina(erro);
      })
  }

}
