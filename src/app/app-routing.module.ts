import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationComponent } from './views/authentication/authentication.component';
import { AuthenticationModule } from './views/authentication/authentication.module';
import { LoginComponent } from './views/authentication/login/login.component';

const routes: Routes = [
  {
   path: '',
   component: AuthenticationComponent,
   children: [
     {
       path: '',
       component: LoginComponent
     }
   ] 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
