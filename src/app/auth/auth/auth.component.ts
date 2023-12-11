import { Component } from '@angular/core';
import {NgForm } from '@angular/forms';
import { AuthResponseData, AuthService } from '../auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
  isLoginMode = false;
  success_message: string | null = null;
  error: string | null = null;
  constructor(private authService: AuthService) {}

  onCreateAccount() {
    this.isLoginMode = false;
  }
  onLogin (form: NgForm) {
    this.isLoginMode = false;
    form.reset();
  }

onSubmit(form: NgForm) {
  if (!form.valid) {
    return;}
  const email = form.value.email;
  const password = form.value.password;

  let authObs: Observable<AuthResponseData>;

  if (this.isLoginMode) {
    authObs = this.authService.login(email, password);
  } else {
    authObs = this.authService.signup(email, password);}

    authObs.subscribe(resData => {console.log(resData);},
    errorRes => {console.log(errorRes);
    this.error = errorRes.error.error.message;})
    if (!this.error) {
      this.success_message = "Account Successfully Created."
    }
    console.log(this.error)
    console.log(this.success_message);
    form.reset()
    }


}

