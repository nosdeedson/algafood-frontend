import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PedidoFazer } from '../model/pedido/pedido-fazer';
import { PedidoFilter } from '../model/pedido/pedido-filter';

@Injectable({
  providedIn: 'root'
})
export class PedidoEndpointService {

  private baseUrl = environment.baseUrl + '/pedidos';
  private options = environment.options;

  constructor( private http: HttpClient) { }

  buscarFormaPagamento(codigo: string): Observable<any>{
    return this.http.get(`${this.baseUrl}/forma-pagamento/${codigo}`, this.options);
  }

  cancelar(codigo: string): Observable<any>{
    return this.http.delete(`${this.baseUrl}/${codigo}/cancela`)
  }

  confirmar(codigo: string): Observable<any>{
    return this.http.put(`${this.baseUrl}/${codigo}/confirmacao`, this.options);
  }

  entregar(codigo: string): Observable<any>{
    return this.http.put(`${this.baseUrl}/${codigo}/entrega`, this.options)
  }

  listar(filter: PedidoFilter): Observable<any>{
    return this.http.get(`${this.baseUrl}`, this.options);
  }

  salvar(pedido: PedidoFazer): Observable<any>{
    return this.http.post(`${this.baseUrl}`, pedido, this.options);
  }
}
