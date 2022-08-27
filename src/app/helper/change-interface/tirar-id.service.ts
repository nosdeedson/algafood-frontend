import { Injectable } from '@angular/core';
import { ProdutoDto } from 'src/app/model/produto/produto-dto';
import { ProdutoModel } from 'src/app/model/produto/produto-model';
import { RestauranteModel } from 'src/app/model/restaurante/restaurante-model';

@Injectable({
  providedIn: 'root'
})
export class TirarIdService {

  restauranteSemId: RestauranteModel;

  constructor() { }

  public tirarIdRestaurante(restaurante: RestauranteModel): RestauranteModel{
    this.restauranteSemId = {
      aberto: restaurante.aberto,
      ativo: restaurante.ativo,
      cozinha: restaurante.cozinha,
      endereco: restaurante.endereco,
      formasPagamento: restaurante.formasPagamento,
      nome: restaurante.nome,
      produtos: restaurante.produtos,
      taxaFrete: restaurante.taxaFrete
    }
    return this.restauranteSemId;
  }

  public tirarIdProduto(produto: ProdutoDto) : ProdutoDto{
    return {
      ativo: produto.ativo,
      descricao: produto.descricao,
      nome: produto.nome,
      preco: produto.preco
    }
  }
}
