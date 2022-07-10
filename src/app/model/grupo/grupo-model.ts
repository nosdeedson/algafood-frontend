import { UserDTO } from "../user/user-model"
import { PermissaoModel } from "./permissao-model"
export interface GrupoModel {
    id?: number,
    nome?: string,
    permissoes?: PermissaoModel[],
    usuarios?: UserDTO[]
}
