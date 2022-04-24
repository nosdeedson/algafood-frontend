import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { EstadoDTO } from '../model/estado/estado-model';

const options = {
  headers : new HttpHeaders({
    'Content-Type' : 'application/json',
    Authorization: 'Bearer ' + environment.token
  })
}

@Injectable({
  providedIn: 'root'
})
export class EstadoEndpointService {

  baseUrl = environment.baseUrl;

  constructor( private http: HttpClient) { }

  listar() : Observable<any>{
    return this.http.get(`${this.baseUrl}/estados`, options);
  }

  salvar(estado : EstadoDTO) : Observable<any>{
    return this.http.post(`${this.baseUrl}/estados`, estado, options);
  }

  editar(estado: EstadoDTO, id: number) : Observable<any>{
    return this.http.put(`${this.baseUrl}/estados/${id}`,estado, options)
  }

  deletar(id: number) : Observable<any>{
    return this.http.delete(`${this.baseUrl}/estados/${id}`, options)
  }

}
