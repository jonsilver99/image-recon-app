import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { LoginService } from './login.service';
import { LoginURL, VerifyAuthURL, RegisterURL } from '../../environments/environment';
import 'rxjs/Rx';
import { Router } from '@angular/router';

@Injectable()
export class InterceptorService implements HttpInterceptor {

    constructor(public loginServ: LoginService, public router: Router) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> | any {
        if (req.url != LoginURL && req.url != RegisterURL && req.url != VerifyAuthURL) {
            req = req.clone({
                setHeaders: {
                    authorization: this.loginServ.authToken
                }
            })
        }

        return next.handle(req)
            .map((returned: any) => {
                // console.log("Incoming server response intercepted:");
                // console.log(returned);
                return returned;
            })
            .catch((err: HttpErrorResponse): Observable<any> => {
                if (err.status == 401) {
                    this.router.navigate(['/Login']);
                    let errMsg = err.message + ' : ' + err.error
                    return Observable.throw(errMsg);
                }
                else {
                    return Observable.throw(err);
                }
            })
    }
}
