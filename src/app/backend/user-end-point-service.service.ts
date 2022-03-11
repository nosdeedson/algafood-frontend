import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { UserDTO } from '../model/user/user-model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserEndPointService {
  baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) { }

  listar() : Observable<any> {
    var headers = new Headers();
    var options  = {}
    headers.set('Authorization', 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJub3NkZWpzMzJAZ21haWwuY29tIiwiaXNzIjoiRWRzb24gSm9zZSBkZSBTb3V6YSIsImlkIjoxLCJleHAiOjE2NDY3OTE5MjV9.1v2H8cvWG1NvuBQ_LAsuuhDMVANjFONzB5rzJIiAgxpWQzcHoxesg9s-gwT0bkcJLJnUDhrejJLJhu-QoPukfA');
    options = {headers}
    
    return this.http.get<any>(`${this.baseUrl}/usuarios`,  options);
  }

  salvar(user: UserDTO) : Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/usuarios`, user);
  }

  getEndPoints() : Observable<any>{
    return this.http.get<any>(`${this.baseUrl}/root`)
  }

}


