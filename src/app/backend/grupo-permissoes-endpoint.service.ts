import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { GrupoModel } from '../model/grupo/grupo-model';

@Injectable({
  providedIn: 'root'
})
export class GrupoPermissoesEndpointService {

  private baseUrl = environment.baseUrl + '/grupos'
  private options = environment.options

  constructor(private http : HttpClient) { }

  associarGrupoPermissao(grupoId: number, permissaoId: number) : Observable<any>{
    return this.http.put(`${this.baseUrl}/${grupoId}/permissoes/${permissaoId}`, this.options);
  }

  desassociarGrupoPermissao(grupoId: number, permissaoId: number) : Observable<any>{
    return this.http.delete(`${this.baseUrl}/${grupoId}/permissoes/${permissaoId}`);
  }

  listar() : Observable<any> {
    return this.http.get(`${this.baseUrl}`, this.options);
  }

  listarPermissoesPorGrupoId(grupoId: number) : Observable<any>{
    return this.http.get(`${this.baseUrl}/${grupoId}/permissoes`);
  }

  listarUsuariosPorGrupoId(grupoId: number) : Observable<any>{
    return this.http.get(`${this.baseUrl}/usuarios-por-grupo/${grupoId}`)
  }

  listarPermissoesNaoVinculadaGrupo(grupoId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${grupoId}/permissoes/permissoes-sem-vinculo-grupo`);
  }

}
