import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import { Observable } from 'rxjs';

const options ={
  headers : new HttpHeaders({
    'Content-Type' : 'application/json',
    Authorization: 'Bearer ' + environment.token
  })
} 


@Injectable({
  providedIn: 'root'
})
export class CidadeEndpointService {
  baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) { }

  listar() : Observable<any>{
    return this.http.get(`${this.baseUrl}/cidades`, options);
  }
}
