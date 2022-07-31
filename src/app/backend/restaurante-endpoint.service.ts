import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RestauranteModel } from '../model/restaurante/restaurante-model';

@Injectable({
  providedIn: 'root'
})
export class RestauranteEndpointService {
  private baseUrl = environment.baseUrl + '/restaurantes';
  private options = environment.options

  constructor(private http: HttpClient) { }

    abrir(id: number): Observable<any>{
      return this.http.put(`${this.baseUrl}/${id}/aberto`, this.options);
    }

    atualizar(idRestaurante: number, restaurante: RestauranteModel): Observable<any> {
      return this.http.put(`${this.baseUrl}/${idRestaurante}`, restaurante, this.options);
    }

    associarFormaPagametno(idRestaurante: number, idFormaPagamento): Observable<any> {
      return this.http.put(`${this.baseUrl}/${idRestaurante}/formas-pagamento/${idFormaPagamento}`, this.options);
    }

    buscar(id: number): Observable<any> {
      return this.http.get(`${this.baseUrl}/${id}`, this.options)
    }

    desassociarFormaPagamento(idRestaurante: number, idFormaPagamento): Observable<any> {
      return this.http.delete(`${this.baseUrl}/${idRestaurante}/formas-pagamento/${idFormaPagamento}`, this.options)
    }

    fechar(id: number): Observable<any> {
      return this.http.delete(`${this.baseUrl}/${id}/aberto`, this.options);
    }

    inativar(id: number): Observable<any> {
      return this.http.delete(`${this.baseUrl}/${id}/ativacao`, this.options)
    }

    listar(): Observable<any> {
      return this.http.get(`${this.baseUrl}`, this.options);
    }

    listarFormasPagamento(idRestaurante: number): Observable<any> {
      return this.http.get(`${this.baseUrl}/${idRestaurante}/formas-pagamento`)
    }

    listarFormasPagamentosNaoAssociadasRestaurante(idRestaurante: number): Observable<any>{
      return this.http.get(`${this.baseUrl}/${idRestaurante}/formas-pagamento/disassociados`, this.options);
    }
    
    listarProdutos(idRestaurante: number): Observable<any> {
      return this.http.get(`${this.baseUrl}/${idRestaurante}/produtos`);
    }

    salvar(restaurante: RestauranteModel): Observable<any>{
      return this.http.post(`${this.baseUrl}`, restaurante, this.options);
    }
  
}
