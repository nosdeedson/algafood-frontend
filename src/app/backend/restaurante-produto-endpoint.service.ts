import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment'; 
import { ProdutoDto } from '../model/produto/produto-dto';

@Injectable({
  providedIn: 'root'
})
export class RestauranteProdutoEndpointService {

  private options = environment.options
  private baseUrl = environment.baseUrl + '/restaurantes'

  constructor(private http: HttpClient) { }

  criarProdutos(idRestaurante: number, produto: ProdutoDto): Observable<any> {
    return this.http.post(`${this.baseUrl}/${idRestaurante}/produtos`, produto, this.options)
  }

  deletarProduto(idRestaurante: number, idProduto: number) : Observable<any>{
    return this.http.delete(`${this.baseUrl}/${idRestaurante}/produtos/${idProduto}`, this.options)
  }

  editarProduto(idRestaurante: number, idProduto: number, produto: ProdutoDto) : Observable<any> {
    return this.http.put(`${this.baseUrl}/${idRestaurante}/produtos/${idProduto}`, produto, this.options);
  }

  listarProdutos(idRestaurante: number) : Observable<any>{
    return this.http.get(`${this.baseUrl}/${idRestaurante}/produtos`, this.options);
  }

}
