import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CozinhaDTO } from '../model/cozinha/cozinha-model';


@Injectable({
  providedIn: 'root'
})
export class CozinhaEndpointService {

  baseUrl = environment.baseUrl + '/cozinhas'
  options = environment.options

  constructor(private http : HttpClient) { }

  delete(id: number) : Observable<any>{
    return this.http.delete(`${this.baseUrl}/${id}`, this.options)
  }

  editar(cozinha : CozinhaDTO, id: number) : Observable<any>{
    return this.http.put(`${this.baseUrl}/${id}`, cozinha, this.options)
  }

  listar() : Observable<any>{
    return this.http.get(`${this.baseUrl}`,this.options)
  }

  salvar(cozinhaDTO : CozinhaDTO) :  Observable<any>{
    return this.http.post(`${this.baseUrl}`, cozinhaDTO, this.options)
  }
}
