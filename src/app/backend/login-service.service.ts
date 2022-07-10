import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserDTO } from '../model/user/user-model';
import { environment } from '../../environments/environment'


@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {
  private baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) { }

  login(user: UserDTO): Observable<any>{
    const json = `{"email": "${user.email}", "senha": "${user.senha}" }`;
    const data = JSON.parse(json);
    return this.http.post(`${this.baseUrl}/login`, user)    
  }
}
