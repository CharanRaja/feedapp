import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class AppHttpInterceptor implements HttpInterceptor {
    constructor() { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        var authToken = sessionStorage.getItem('token');
        var headers = new HttpHeaders({});
        if(authToken){
          headers = new HttpHeaders({
            'authorization' :'Bearer ' + authToken,
            });
        }
        request = request.clone({headers});
        return next.handle(request);
    }
}