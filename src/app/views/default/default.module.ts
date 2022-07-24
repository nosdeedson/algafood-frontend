import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultComponent } from './default.component';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HomeComponent } from '../home/home.component';
import { TemplateModule } from 'src/app/components/template/template.module';
import { ListarUsuariosComponent } from '../listar-usuarios/listar-usuarios.component';
import {  MatTableModule} from '@angular/material/table'
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
import { WaitingReponseComponent } from 'src/app/components/waiting-reponse/waiting-reponse.component';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { AssociarUserPermitionGroupComponent } from 'src/app/components/associar-user-permition-group/associar-user-permition-group.component';
import {MatDialogModule} from '@angular/material/dialog';
import { PermissaoEditarComponent } from 'src/app/components/modais/permissao-editar/permissao-editar.component';
import { CriarGrupoComponent } from 'src/app/components/criar-grupo/criar-grupo.component';
import { CriarPermissaoComponent } from 'src/app/components/criar-permissao/criar-permissao.component';
import { ListarProdutosComponent } from '../listar-produtos/listar-produtos.component';
import { ListarPedidosComponent } from '../listar-pedidos/listar-pedidos.component';
import { ListarPermissoesComponent } from '../listar-permissoes/listar-permissoes.component';
import { CriarEditarProdutoComponent } from 'src/app/components/criar-editar-produto/criar-editar-produto.component';
import { ListarRestaurantesComponent } from '../listar-restaurantes/listar-restaurantes.component';
import { CriarEditarRestauranteComponent } from 'src/app/components/criar-editar-restaurante/criar-editar-restaurante.component';
import {MatStepperModule} from '@angular/material/stepper';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MostraEnderecoComponent } from 'src/app/components/modais/mostra-endereco/mostra-endereco.component';
import {MatMenuModule} from '@angular/material/menu';
import { CriarEditarEnderecoComponent } from 'src/app/components/criar-editar-endereco/criar-editar-endereco.component';
import { FormEnderecoComponent } from 'src/app/components/forms/form-endereco/form-endereco.component';

@NgModule({
  declarations: [
    DefaultComponent,
    HomeComponent,
    ListarUsuariosComponent,
    ListarPedidosComponent,
    ListarPermissoesComponent,
    CriarEditarUsuarioComponent,
    ListarCidadesComponent,
    CriarEditarCidadeComponent,
    ListarEstadosComponent,
    CriarEditarEstadoComponent,
    ListarCozinhasComponent,
    CriarEditarCozinhaComponent,
    WaitingReponseComponent,
    AssociarUserPermitionGroupComponent,
    PermissaoEditarComponent,
    CriarPermissaoComponent,
    CriarGrupoComponent,
    ListarProdutosComponent,
    CriarEditarProdutoComponent,
    ListarRestaurantesComponent,
    CriarEditarRestauranteComponent,
    MostraEnderecoComponent,
    CriarEditarEnderecoComponent,
    FormEnderecoComponent,
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
    MatProgressBarModule,
    MatSelectModule,
    MatInputModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatSortModule,
    MatDialogModule,
    MatStepperModule,
    MatCheckboxModule,
    MatMenuModule
  ],
  schemas:[
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class DefaultModule { }
