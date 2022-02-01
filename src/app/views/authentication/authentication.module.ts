import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticationComponent } from './authentication.component';
import { LoginComponent } from './login/login.component';
import { RouterModule } from '@angular/router';
import { TemplateModule } from 'src/app/components/template/template.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CadastrarComponent } from './cadastrar/cadastrar.component';
import { EsqueceuSenhaComponent } from './esqueceu-senha/esqueceu-senha.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [ 
    AuthenticationComponent,
    LoginComponent,
    CadastrarComponent,
    EsqueceuSenhaComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FlexLayoutModule,
    TemplateModule,
    FormsModule
  ]
})
export class AuthenticationModule { }
