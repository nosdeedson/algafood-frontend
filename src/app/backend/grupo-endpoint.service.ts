import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { GrupoModel } from '../model/grupo/grupo-model';
import { GrupoPermissaoDto } from '../model/grupo/grupo-permissao-dto';

@Injectable({
  providedIn: 'root'
})
export class GrupoEndpointService {
  private baseUrl = environment.baseUrl + '/grupos';
  private optons = environment.options;
  constructor( private http: HttpClient) { }

  salvarGrupoAssociarPermissoes(grupo: GrupoPermissaoDto): Observable<any> {
    return this.http.post(`${this.baseUrl}/salvar-grupo-associar-permissoes`, grupo, this.optons);
  }
  
}
