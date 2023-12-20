import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, exhaustMap, map, mergeMap } from 'rxjs';


import { PetfinderApiService } from './petfinder-api.service';


@Injectable()


export class TokenInterceptorService implements HttpInterceptor {
   
    constructor( private petfinderService: PetfinderApiService) {}
   
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (req.url === 'https://api.petfinder.com/v2/oauth2/token') {
            return next.handle(req);
        }
        else {
            return this.petfinderService.getOAuthToken()
            .pipe(
                map(responseData => {
                let token = responseData;
                console.log(token);
                return token;
                }),
                exhaustMap(token => {
                    const modifiedReq = req.clone(
                        {headers: new HttpHeaders({ Authorization: `Bearer ${token}`})}
                    )
                    console.log(modifiedReq);
                    return next.handle(modifiedReq);
                })
            );
        }
    }
}
