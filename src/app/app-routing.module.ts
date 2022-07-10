import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationGuardGuard } from './authentication-guard.guard';
import { AssociarUserPermitionGroupComponent } from './components/associar-user-permition-group/associar-user-permition-group.component';
import { CriarEditarCidadeComponent } from './components/criar-editar-cidade/criar-editar-cidade.component';
import { CriarEditarCozinhaComponent } from './components/criar-editar-cozinha/criar-editar-cozinha.component';
import { CriarEditarEstadoComponent } from './components/criar-editar-estado/criar-editar-estado.component';
import { CriarEditarUsuarioComponent } from './components/criar-editar-usuario/criar-editar-usuario.component';
import { CriarGrupoComponent } from './components/criar-grupo/criar-grupo.component';
import { CriarPermissaoComponent } from './components/criar-permissao/criar-permissao.component';
import { AuthenticationComponent } from './views/authentication/authentication.component';
import { CadastrarComponent } from './views/authentication/cadastrar/cadastrar.component';
import { EsqueceuSenhaComponent } from './views/authentication/esqueceu-senha/esqueceu-senha.component';
import { LoginComponent } from './views/authentication/login/login.component';
import { DefaultComponent } from './views/default/default.component';
import { EnderecosComponent } from './views/enderecos/enderecos.component';
import { HomeComponent } from './views/home/home.component';
import { ListarCidadesComponent } from './views/listar-cidades/listar-cidades.component';
import { ListarCozinhasComponent } from './views/listar-cozinhas/listar-cozinhas.component';
import { ListarEstadosComponent } from './views/listar-estados/listar-estados.component';
import { ListarProdutosComponent } from './views/listar-produtos/listar-produtos.component';
import { ListarUsuariosComponent } from './views/listar-usuarios/listar-usuarios.component';
import { ListarPedidosComponent } from './views/listar-pedidos/listar-pedidos.component';
import { CriarEditarProdutoComponent } from './components/criar-editar-produto/criar-editar-produto.component';
import { ListarPermissoesComponent } from './views/listar-permissoes/listar-permissoes.component';

const routes: Routes = [
  {
   path: '',
   component: AuthenticationComponent,
   children: [
     {
       path: '',
       component: LoginComponent
     },
     {
       path: 'cadastrar',
       component: CadastrarComponent
     },{
       path: 'esqueceu-senha',
       component: EsqueceuSenhaComponent
     }
   ] 
  },
  {
    path: '',
    component:DefaultComponent,
    canActivate: [AuthenticationGuardGuard],
    children:[
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'listar-usuarios',
        component: ListarUsuariosComponent
      },
      {
        path: 'listar-produtos',
        component: ListarProdutosComponent
      },
      {
        path: 'listar-pedidos',
        component: ListarPedidosComponent
      },
      {
        path: 'listar-permissoes',
        component: ListarPermissoesComponent
      },
      {
        path: 'criar-permissao',
        component: CriarPermissaoComponent
      },
      {
        path: 'criar-grupo',
        component: CriarGrupoComponent
      },
      {
        path: 'associar-usuario-perimissao-grupo',
        component: AssociarUserPermitionGroupComponent
      },
      {
        path: 'enderecos',
        component : EnderecosComponent
      },
      {
        path: 'adicionar-usuario',
        component: CriarEditarUsuarioComponent
      },
      {
        path: 'editar-usuario',
        component: CriarEditarUsuarioComponent
      },
      {
        path: 'listar-cidades',
        component: ListarCidadesComponent
      },
      {
        path: 'editar-cidade',
        component: CriarEditarCidadeComponent
      },
      {
        path: 'listar-estados',
        component: ListarEstadosComponent
      },
      {
        path: 'adicionar-estado',
        component: CriarEditarEstadoComponent
      },
      {
        path: 'editar-estado',
        component: CriarEditarEstadoComponent
      },
      {
        path: 'listar-cozinhas',
        component: ListarCozinhasComponent
      },
      {
        path: 'adicionar-cozinha',
        component: CriarEditarCozinhaComponent
      },
      {
        path: 'editar-cozinha',
        component: CriarEditarCozinhaComponent
      },
      {
        path: 'adicionar-produto',
        component: CriarEditarProdutoComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
