import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import { UserDTO } from '../model/user/user-model';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserEndPointService {
  
  private baseUrl = environment.baseUrl + '/usuarios';
  private urlRoot = environment.baseUrl;
  private options = environment.options
  constructor(private http: HttpClient) {
   }

  deletar(id: number): Observable<any>{
    return this.http.delete<any>(`${this.baseUrl}/${id}`, this.options)
  }

  editar(user: UserDTO, id: number) : Observable<any>{
    return this.http.put<any>(`${this.baseUrl}/${id}`, user, this.options)
  }

  listar() : Observable<any> {
    return this.http.get<any>(`${this.baseUrl}`,  this.options);
  }

  listarUsuariosNãoVinculadosAoGrupo(grupoId : number) : Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/usuarios-sem-vinculo-grupo/${grupoId}`);
  }

  salvar(user: UserDTO) : Observable<any> {
    return this.http.post<any>(`${this.baseUrl}`, user);
  }

  getEndPoints() : Observable<any>{
    return this.http.get<any>(`${this.urlRoot}/root`)
  }

}


