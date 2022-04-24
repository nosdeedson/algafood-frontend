import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AuthenticationModule } from './views/authentication/authentication.module';
import { TemplateModule } from './components/template/template.module';
import { HttpClientModule } from '@angular/common/http';
import { DefaultModule } from './views/default/default.module';
import { CriarEditarCozinhaComponent } from './components/criar-editar-cozinha/criar-editar-cozinha.component';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FlexLayoutModule,
    TemplateModule,
    AuthenticationModule,
    DefaultModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
