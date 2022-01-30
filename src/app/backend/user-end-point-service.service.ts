import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { UserDTO } from '../model/user/user-model';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UserEndPointServiceService {
  baseUrl = 'http://localhost:8080/usuarios';
  constructor(private http: HttpClient) { }

  salvar(user: UserDTO) : Observable<any> {
    return this.http.post<any>(this.baseUrl, user);
  }

  getEndPoints() : Observable<any>{
    return this.http.get<any>('http://localhost:8080/root')
  }

}


