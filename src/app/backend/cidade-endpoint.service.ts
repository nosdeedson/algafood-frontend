import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import { Observable } from 'rxjs';
import { CidadeDTO } from '../model/cidade/cidade-model';

const options ={
  headers : new HttpHeaders({
    'Content-Type' : 'application/json',
    Authorization: 'Bearer ' + environment.token
  })
} 


@Injectable({
  providedIn: 'root'
})
export class CidadeEndpointService {
  baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) { }

  deletar(id: number) : Observable<any>{
    return this.http.delete(`${this.baseUrl}/cidades/${id}`, options);
  }

  editar(cidade: CidadeDTO, id: number){
    return this.http.put(`${this.baseUrl}/cidades/${id}`, cidade, options);
  }

  listar() : Observable<any>{
    return this.http.get(`${this.baseUrl}/cidades`, options);
  }

  salvar( cidateDTO: CidadeDTO) : Observable<any>{
    return this.http.post(`${this.baseUrl}/cidades`, cidateDTO, options);
  }




}

