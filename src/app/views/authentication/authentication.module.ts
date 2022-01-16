import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticationComponent } from './authentication.component';
import { LoginComponent } from './login/login.component';
import { RouterModule } from '@angular/router';
import { TemplateModule } from 'src/app/components/template/template.module';
import { FlexLayoutModule } from '@angular/flex-layout';



@NgModule({
  declarations: [ 
    AuthenticationComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    TemplateModule,
    FlexLayoutModule
  ]
})
export class AuthenticationModule { }
