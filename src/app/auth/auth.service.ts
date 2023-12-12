import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';
import { throwError, Subject, BehaviorSubject } from 'rxjs';
import { User } from './auth/user.model';
import { environment } from '../environments/environment';



export interface AuthResponseData {
  idToken: string; email: string; refreshToken: string; expiresIn:string; localId: string; registered?: boolean;
}


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user = new BehaviorSubject<User>(null);
  // here the BehaviorSubject is subscriptable after the user has been emitted, meaning that this.authService.user.pipe(take(1), exhaustMap(user => {
 //  return this.http.get<PetList[]>()
  //  } )) could be used infront of fetchPets to authenticate the user https://pro.academind.com/courses/765847/lectures/13906586

  constructor(private http: HttpClient) { }

  signup2(email: string, password: string) {
    return this.http.post<AuthResponseData>(environment.FB_API_URL_SIGN_UP + environment.FB_API_KEY,
    {email:email, password: password, returnSecureToken: true })
  .pipe(catchError(this.handleError), tap(resData => {
    this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
  }))
  }


  login2 (email: string, password: string) {
    return this.http.post<AuthResponseData>(environment.FB_API_URL_LOGIN+ environment.FB_API_KEY,
    {email: email, password: password, returnSecureToken: true})
    .pipe(catchError(this.handleError), tap(resData => {
      this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
    }))
  }

  logout () {
    this.user.next(null);
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unkonwn error occurred!'
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage);
    }
    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This email exists already.';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = "User was not found."
        break;
      case "INVALID_PASSWORD":
        errorMessage = 'This password is not correct'
    }
    return throwError(errorMessage);
  }

  private handleAuthentication(email: string, userId: string, token: string, expiresIn: number) {
    {const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
      const user = new User(email, userId, token, expirationDate);
      this.user.next(user);}
  }
}
