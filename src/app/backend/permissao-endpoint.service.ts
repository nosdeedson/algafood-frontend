import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PermissaoModel } from '../model/grupo/permissao-model';

@Injectable({
  providedIn: 'root'
})
export class PermissaoEndpointService {
  baseUrl = environment.baseUrl + '/permissoes';
  options = environment.options;

  constructor(private http: HttpClient) { }

  atualizar(permissaoId: number, permissao: PermissaoModel): Observable<any> {
    return this.http.put(`${this.baseUrl}/${permissaoId}`, permissao, this.options);
  }

  deletar(permissaoId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${permissaoId}`);
  }

  salvar(permissao: PermissaoModel): Observable<any> {
    return this.http.post(`${this.baseUrl}`, permissao, this.options);
  }

}
