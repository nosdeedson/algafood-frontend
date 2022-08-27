import { CozinhaId } from "../cozinha/cozinha-id";
import { EnderecoModel } from "../endereco/endereco-model";
import { FormaPagamentoModel } from "../forma-pagamento/forma-pagamento-model";
import { ProdutoModel } from "../produto/produto-model";

export interface RestauranteModel {
    id?: number,
    nome?: string,
    ativo?: boolean,
    aberto?: boolean,
    endereco?: EnderecoModel
    taxaFrete?: number,
    cozinha?: CozinhaId
    produtos?: ProdutoModel[],
    formasPagamento?: FormaPagamentoModel[]
}
