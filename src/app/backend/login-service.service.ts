import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserDTO } from '../model/user/user-model';
import { environment } from '../../environments/environment'


const options = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Access-Control-Allow-Origin' : '*'
  })
};

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {
  baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) { }

  login(user: UserDTO): Observable<any>{
    return this.http.post(`${this.baseUrl}/login`, user)    
  }
}
