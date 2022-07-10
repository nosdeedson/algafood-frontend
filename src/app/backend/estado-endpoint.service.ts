import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { EstadoDTO } from '../model/estado/estado-model';

@Injectable({
  providedIn: 'root'
})
export class EstadoEndpointService {

  private baseUrl = environment.baseUrl + '/estados';
  private options = environment.options

  constructor( private http: HttpClient) { }

  deletar(id: number) : Observable<any>{
    return this.http.delete(`${this.baseUrl}/${id}`, this.options)
  }

  editar(estado: EstadoDTO, id: number) : Observable<any>{
    return this.http.put(`${this.baseUrl}/${id}`,estado, this.options)
  }
  
  listar() : Observable<any>{
    return this.http.get(`${this.baseUrl}`, this.options);
  }

  salvar(estado : EstadoDTO) : Observable<any>{
    return this.http.post(`${this.baseUrl}`, estado, this.options);
  }

}
