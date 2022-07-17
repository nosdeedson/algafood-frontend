import { CidadeId } from "../cidade/cidade-id";

export interface EnderecoModel {
    bairro?: string,
    cep?: string,
    logradouro?: string,
    numero?: string,
    complemento?: string,
    cidade?: CidadeId
}
