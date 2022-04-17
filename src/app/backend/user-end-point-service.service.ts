import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import { UserDTO } from '../model/user/user-model';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

const options = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    Authorization: 'Bearer ' + environment.token
  })
};


@Injectable({
  providedIn: 'root'
})
export class UserEndPointService {
  baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) { }

  deletar(id: number): Observable<any>{
    return this.http.delete<any>(`${this.baseUrl}/usuarios/${id}`, options)
  }

  editar(user: UserDTO, id: number) : Observable<any>{
    return this.http.put<any>(`${this.baseUrl}/usuarios/${id}`, user, options)
  }

  listar() : Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/usuarios`,  options);
  }

  salvar(user: UserDTO) : Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/usuarios`, user);
  }

  getEndPoints() : Observable<any>{
    return this.http.get<any>(`${this.baseUrl}/root`)
  }

}


