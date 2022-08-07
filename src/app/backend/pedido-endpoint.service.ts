import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PedidoFilter } from '../model/pedido/pedido-filter';

@Injectable({
  providedIn: 'root'
})
export class PedidoEndpointService {

  private baseUrl = environment.baseUrl + '/pedidos';
  private options = environment.options;

  constructor( private http: HttpClient) { }

  listar(filter: PedidoFilter): Observable<any>{
    // let queryParams = new HttpParams()
    //     .append("clienteId", filter?.clienteId)
    //     .append("restauranteId", filter?.restauranteId)
    //     .append("dataCriacaoInicio", String(filter?.dataCriacaoInicio))
    //     .append("dataCriacaoFim", String(filter?.dataCriacaoFim));
    // this.options.params = queryParams
    return this.http.get(`${this.baseUrl}`, this.options);
  }
}
