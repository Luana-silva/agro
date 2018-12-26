import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpResponse,
    HttpErrorResponse
} from '@angular/common/http';
import { AuthService } from 'app/shared/auth/auth.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    constructor(public auth: AuthService) { }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = this.auth.getToken();
        if (token) {
            request = request.clone({
                setHeaders: {
                    ContentType: 'application/json',
                    Authorization: `Bearer ${this.auth.getToken()}`
                }
            });
        }
        return next.handle(request).do((event: HttpEvent<any>) => {
            if (event instanceof HttpResponse) {
                // do stuff with response if you want
            }
        }, (err: any) => {
            if (err instanceof HttpErrorResponse) {
                if (err.status === 401) {
                    this.auth.logoutExpire();
                }
            }
        });
    }
}
