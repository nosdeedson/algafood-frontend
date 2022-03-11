import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationComponent } from './views/authentication/authentication.component';
import { CadastrarComponent } from './views/authentication/cadastrar/cadastrar.component';
import { EsqueceuSenhaComponent } from './views/authentication/esqueceu-senha/esqueceu-senha.component';
import { LoginComponent } from './views/authentication/login/login.component';
import { DefaultComponent } from './views/default/default.component';
import { HomeComponent } from './views/home/home.component';
import { ListarUsuariosComponent } from './views/listar-usuarios/listar-usuarios.component';

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
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
