import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CriarEditarCidadeComponent } from './components/criar-editar-cidade/criar-editar-cidade.component';
import { CriarEditarCozinhaComponent } from './components/criar-editar-cozinha/criar-editar-cozinha.component';
import { CriarEditarEstadoComponent } from './components/criar-editar-estado/criar-editar-estado.component';
import { CriarEditarUsuarioComponent } from './components/criar-editar-usuario/criar-editar-usuario.component';
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
import { ListarUsuariosComponent } from './views/listar-usuarios/listar-usuarios.component';
import { MeuPerfilComponent } from './views/meu-perfil/meu-perfil.component';
import { PedidosComponent } from './views/pedidos/pedidos.component';
import { AdicionarComponent } from './views/permissoes/adicionar/adicionar/adicionar.component';
import { PermissoesComponent } from './views/permissoes/permissoes.component';

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
        path: 'meu-perfil',
        component: MeuPerfilComponent
      },
      {
        path: 'pedidos',
        component: PedidosComponent
      },
      {
        path: 'permissoes',
        component: PermissoesComponent
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
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
