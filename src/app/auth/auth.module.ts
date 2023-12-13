import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth/auth.component';
import { AuthInterceptorService } from './auth-interceptor.service';
import { RegistrationComponent } from './registration/registration.component';




@NgModule({
  declarations: [
    AuthComponent,
    RegistrationComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    AuthRoutingModule
  ],
  providers: [{provide:HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true }]
})
export class AuthModule { }
