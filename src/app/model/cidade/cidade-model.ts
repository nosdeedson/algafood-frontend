import { EstadoDTO } from "../estado/estado-model"

export interface CidadeDTO{
    estado?: EstadoDTO
    id?: number,
    nome?: string
}