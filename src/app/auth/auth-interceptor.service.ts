import { Injectable } from "@angular/core";
import { HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from "@angular/common/http";
import { exhaustMap, take } from "rxjs/operators";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";

// export class AuthInterceptorService implements HttpInterceptor
// intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>
// https://pro.academind.com/courses/765847/lectures/13906588

@Injectable()
export class AuthInterceptorService {
  constructor(private authService: AuthService) {}}

//   intercept(req: HttpRequest<any>, next: HttpHandler) {
//     this.authService.user.pipe(take(1),
//     exhaustMap(user => {
//       if (!user) {
//         return next.handle(req);
//       }
//       const modifiedreq = req.clone({params: new HttpParams().set('auth', user?.token)});
//       return next.handle(modifiedreq);
//     }))

//   }
// }
