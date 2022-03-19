import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationComponent } from './views/authentication/authentication.component';
import { CadastrarComponent } from './views/authentication/cadastrar/cadastrar.component';
import { EsqueceuSenhaComponent } from './views/authentication/esqueceu-senha/esqueceu-senha.component';
import { LoginComponent } from './views/authentication/login/login.component';
import { DefaultComponent } from './views/default/default.component';
import { EnderecosComponent } from './views/enderecos/enderecos.component';
import { HomeComponent } from './views/home/home.component';
import { ListarUsuariosComponent } from './views/listar-usuarios/listar-usuarios.component';
import { MeuPerfilComponent } from './views/meu-perfil/meu-perfil.component';
import { PedidosComponent } from './views/pedidos/pedidos.component';
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
  },{
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
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
