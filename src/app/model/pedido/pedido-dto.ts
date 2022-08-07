import { RestauranteModel } from "../restaurante/restaurante-model";
import { UserDTO } from "../user/user-model";

export interface PedidoDTO {
    codigo?: string,
    dataCriacao?: string,
    cliente?: UserDTO,
    restaurante?: RestauranteModel,
    status?: string,
    subTotal?: number,
    taxaFrete?: number,
    valorTotal?: number
}
