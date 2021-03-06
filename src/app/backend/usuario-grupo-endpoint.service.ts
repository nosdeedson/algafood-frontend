import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class UsuarioGrupoEndpointService {

  private baseUrl = environment.baseUrl + '/usuarios'
  private options = environment.options

  constructor(private http: HttpClient) { }

  associarGrupoUsuario(usuarioId: number, grupoId: number) : Observable<any> {
    return this.http.put(`${this.baseUrl}/${usuarioId}/grupos/${grupoId}`, this.options)
  }
  
  desassociarGrupoUsuario(usuarioId: number, grupoId: number,) : Observable<any>{
    return this.http.delete(`${this.baseUrl}/${usuarioId}/grupos/${grupoId}`)
  }

}
