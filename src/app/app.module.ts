import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AuthenticationModule } from './views/authentication/authentication.module';
import { TemplateModule } from './components/template/template.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { DefaultModule } from './views/default/default.module';
import { RequestInterceptor } from './request.interceptor';
import { FormEnderecoComponent } from './components/forms/form-endereco/form-endereco.component';
import { AssociarPagamentoComponent } from './components/associar-pagamento/associar-pagamento.component';
import { FazerPedidoComponent } from './components/fazer-pedido/fazer-pedido/fazer-pedido.component';
import { ExibirFormaPagamentoPedidoComponent } from './components/exibir-forma-pagamento-pedido/exibir-forma-pagamento-pedido.component';


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
    DefaultModule,
  ],
  providers: [ { provide: HTTP_INTERCEPTORS, useClass: RequestInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
