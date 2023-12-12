import { Component } from '@angular/core';
import {NgForm } from '@angular/forms';
import { AuthResponseData, AuthService } from '../auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
  isLoginMode = true;
  success_message: string | null = null;
  error: string | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  onCreateAccount() {
    this.isLoginMode = false;
  }
  onLogin (form: NgForm) {
    this.isLoginMode = true;
    form.reset();
  }



onSubmit2(form: NgForm) {
  if (!form.valid) {
    return;
  }
  const email = form.value.email;
  const password = form.value.password;
  let authObs: Observable<AuthResponseData>;

  if (this.isLoginMode) {
    authObs = this.authService.login2(email, password)
  } else {
    authObs = this.authService.signup2(email, password)
  }
  authObs.subscribe(
    resData => {console.log(resData);
    this.router.navigate(['/home']);},
    errorMessage => {console.log(errorMessage);
                    this.error = errorMessage;});

  form.reset()

  }



}

