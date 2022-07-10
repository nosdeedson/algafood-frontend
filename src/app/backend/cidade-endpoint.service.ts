import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import { Observable } from 'rxjs';
import { CidadeDTO } from '../model/cidade/cidade-model';

@Injectable({
  providedIn: 'root'
})
export class CidadeEndpointService {
  private baseUrl = environment.baseUrl + '/cidades';
  private options = environment.options
  constructor(private http: HttpClient) { }

  deletar(id: number) : Observable<any>{
    return this.http.delete(`${this.baseUrl}/${id}`, this.options);
  }

  editar(cidade: CidadeDTO, id: number){
    return this.http.put(`${this.baseUrl}/${id}`, cidade, this.options);
  }

  listar() : Observable<any>{
    return this.http.get(`${this.baseUrl}`, this.options);
  }

  salvar( cidateDTO: CidadeDTO) : Observable<any>{
    return this.http.post(`${this.baseUrl}`, cidateDTO, this.options);
  }




}

