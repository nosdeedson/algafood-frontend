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
import { PermissoesComponent } from '../permissoes/permissoes.component';
import {MatTableModule} from '@angular/material/table'
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { CriarEditarUsuarioComponent } from 'src/app/components/criar-editar-usuario/criar-editar-usuario.component';
import { FormsModule } from '@angular/forms';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { ListarCidadesComponent } from '../listar-cidades/listar-cidades.component';


@NgModule({
  declarations: [
    DefaultComponent,
    HomeComponent,
    ListarUsuariosComponent,
    MeuPerfilComponent,
    PedidosComponent,
    PermissoesComponent,
    CriarEditarUsuarioComponent,
    ListarCidadesComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FlexLayoutModule,
    TemplateModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    MatProgressSpinnerModule
  ]
})
export class DefaultModule { }
