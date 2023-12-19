import { Component, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms'
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthResponseData, AuthService } from '../auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent implements OnInit {
  error: string | null = null;
  constructor(private authService: AuthService, private router: Router) {}
  registerForm: FormGroup;

  ngOnInit() {
    this.registerForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      confirmPassword: new FormControl('', [Validators.required, Validators.minLength(6)]),
    });
  }

  get password() { return this.registerForm.controls['password']; }
  get confirmPassword() { return this.registerForm.controls['confirmPassword']; }

  checkPassword(control: FormControl): {[s: string]: boolean} {
    if (this.confirmPassword !== this.password) {
      return {'passwordMismatch': true}; }
    return null;}

  onSubmit() {
    if (!this.registerForm.valid) {
      return;
    }
    const email = this.registerForm.value.email;
    const password = this.registerForm.value.password;
    const confirmPassword = this.registerForm.value.confirmPassword;

    let authObs: Observable<AuthResponseData>;
    authObs = this.authService.signup2(email, password)



    authObs.subscribe(
      resData => {console.log(resData);
      this.router.navigate(['/home'])},
      errorMessage => {console.log(errorMessage);
                      this.error = errorMessage;}
    )
    this.registerForm.reset()
  }
}
