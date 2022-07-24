import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RestauranteModel } from '../model/restaurante/restaurante-model';

@Injectable({
  providedIn: 'root'
})
export class RestauranteEndpointService {
  private baseUrl = environment.baseUrl + '/restaurantes';
  private options = environment.options

  constructor(private http: HttpClient,
    private router: Router) { }

    atualizar(idRestaurante: number, restaurante: RestauranteModel): Observable<any> {
      return this.http.put(`${this.baseUrl}/${idRestaurante}`, restaurante, this.options);
    }

    buscar(id: number): Observable<any> {
      return this.http.get(`${this.baseUrl}/${id}`, this.options)
    }

    listar(): Observable<any> {
      return this.http.get(`${this.baseUrl}`, this.options);
    }

    listarFormasPagamento(idRestaurante: number): Observable<any> {
      return this.http.get(`${this.baseUrl}/${idRestaurante}/formas-pagamento`)
    }

    listarProdutos(idRestaurante: number): Observable<any> {
      return this.http.get(`${this.baseUrl}/${idRestaurante}/produtos`);
    }

    salvar(restaurante: RestauranteModel): Observable<any>{
      return this.http.post(`${this.baseUrl}`, restaurante, this.options);
    }
  
}
