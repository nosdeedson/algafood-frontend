import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultComponent } from './default.component';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HomeComponent } from '../home/home.component';
import { TemplateModule } from 'src/app/components/template/template.module';
import { ListarUsuariosComponent } from '../listar-usuarios/listar-usuarios.component';
import { MeuPerfilComponent } from '../meu-perfil/meu-perfil.component';
import { PedidosComponent } from '../pedidos/pedidos.component';



@NgModule({
  declarations: [
    DefaultComponent,
    HomeComponent,
    ListarUsuariosComponent,
    MeuPerfilComponent,
    PedidosComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FlexLayoutModule,
    TemplateModule
  ]
})
export class DefaultModule { }
