import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
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
import {MatTableDataSource, MatTableModule} from '@angular/material/table'
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { CriarEditarUsuarioComponent } from 'src/app/components/criar-editar-usuario/criar-editar-usuario.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { ListarCidadesComponent } from '../listar-cidades/listar-cidades.component';
import { CriarEditarCidadeComponent } from 'src/app/components/criar-editar-cidade/criar-editar-cidade.component';
import { ListarEstadosComponent } from '../listar-estados/listar-estados.component';
import { CriarEditarEstadoComponent } from 'src/app/components/criar-editar-estado/criar-editar-estado.component';
import {MatSelectModule} from '@angular/material/select';
import { MatInputModule} from '@angular/material/input'
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSortModule } from '@angular/material/sort';
import { ListarCozinhasComponent } from '../listar-cozinhas/listar-cozinhas.component';
import { CriarEditarCozinhaComponent } from 'src/app/components/criar-editar-cozinha/criar-editar-cozinha.component';

@NgModule({
  declarations: [
    DefaultComponent,
    HomeComponent,
    ListarUsuariosComponent,
    MeuPerfilComponent,
    PedidosComponent,
    PermissoesComponent,
    CriarEditarUsuarioComponent,
    ListarCidadesComponent,
    CriarEditarCidadeComponent,
    ListarEstadosComponent,
    CriarEditarEstadoComponent,
    ListarCozinhasComponent,
    CriarEditarCozinhaComponent
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
    MatProgressSpinnerModule,
    MatSelectModule,
    MatInputModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatSortModule,
  ],
  schemas:[
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class DefaultModule { }
