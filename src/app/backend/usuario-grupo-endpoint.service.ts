import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class UsuarioGrupoEndpointService {

  baseUrl = environment.baseUrl + '/usuarios'
  options = environment.options

  constructor(private http: HttpClient) { }
  
  desassociarGrupoUsuario(usuarioId: number, grupoId: number,) : Observable<any>{
    return this.http.delete(`${this.baseUrl}/${usuarioId}/grupos/${grupoId}`)
  }

}
