import { EnderecoModel } from "../endereco/endereco-model";
import { FormaPagamentoModel } from "../forma-pagamento/forma-pagamento-model";
import { ItensPedido } from "../itensPedido/itens-pedido";
import { RestauranteModel } from "../restaurante/restaurante-model";

export interface PedidoFazer {
    enderecoEntrega?: EnderecoModel,
    formaPagamento?: FormaPagamentoModel,
    itens?: ItensPedido[],
    restaurante?: RestauranteModel,
    usuarioId?: number
}
