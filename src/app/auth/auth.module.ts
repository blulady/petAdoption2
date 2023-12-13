import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth/auth.component';
import { AuthInterceptorService } from './auth-interceptor.service';


@NgModule({
  declarations: [
    AuthComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule
  ],
  providers: [{provide:HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true }]

})
export class AuthModule { }
