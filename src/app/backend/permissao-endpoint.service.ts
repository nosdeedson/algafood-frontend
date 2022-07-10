import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PermissaoModel } from '../model/grupo/permissao-model';

@Injectable({
  providedIn: 'root'
})
export class PermissaoEndpointService {
  private baseUrl = environment.baseUrl + '/permissoes';
  private options = environment.options;

  constructor(private http: HttpClient) { }

  atualizar(permissaoId: number, permissao: PermissaoModel): Observable<any> {
    return this.http.put(`${this.baseUrl}/${permissaoId}`, permissao, this.options);
  }

  deletar(permissaoId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${permissaoId}`);
  }

  listar() : Observable<any> {
    return this.http.get(`${this.baseUrl}`, this.options);
  }

  salvar(permissao: PermissaoModel): Observable<any> {
    return this.http.post(`${this.baseUrl}`, permissao, this.options);
  }

}
