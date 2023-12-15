import { Component } from '@angular/core';
import { NgForm } from '@angular/forms'
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthResponseData, AuthService } from '../auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  error: string | null = null;


  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;
    let authObs: Observable<AuthResponseData>;
    authObs = this.authService.signup2(email, password)

    authObs.subscribe(
      resData => {console.log(resData);
      this.router.navigate(['/login'])},
      errorMessage => {console.log(errorMessage);
                      this.error = errorMessage;}
    )
    form.reset()
  }
}
