import { CanActivateFn, CanActivate, ActivatedRouteSnapshot, RouterState, RouterStateSnapshot} from '@angular/router';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from './auth.service';


@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean | boolean> {
    return this.authService.user.pipe(map(user =>{
      return !!user;
    }));
  }}



// from docs
// class PermissionsService {
//   canActivate( currentUser: UserToken, userId: string): boolean | Promise<boolean> | Observable<boolean> {
//     return true;}
//   canMatch(currentUser: UserToken): boolean {
//       return true;
//   }
// }

// @Injectable()
// class UserToken {}


// @Injectable()
// class PermissionsService {
//   constructor(private authService: AuthService) {}
//   canActivate( currentUser: UserToken): boolean | Promise<boolean> | Observable<boolean> {
//     return !!this.authService.user;}
// }

// const canSeeFavs: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
//   return inject(PermissionsService).canActivate(inject(UserToken));
// }




