import { Injectable } from '@angular/core';
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
      formaPagamento: restaurante.formaPagamento,
      nome: restaurante.nome,
      produtos: restaurante.produtos,
      taxaFrete: restaurante.taxaFrete
    }
    return this.restauranteSemId;
  }
}
