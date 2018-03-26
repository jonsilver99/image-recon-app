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
        if (this.interceptionIsNeeded(req.url)) {
            req = req.clone({
                setHeaders: {
                    authorization: this.loginServ.authToken
                }
            })
        }

        return next.handle(req)
            .map((returned: any) => {
                return returned;
            })
            .catch((err: HttpErrorResponse): Observable<any> => {
                debugger;
                if ('error' in err && typeof err.error == 'string') {
                    alert(err.error);
                }
                if ('error' in err && 'invalidInput' in err.error) {
                    let invalidInput = err.error.invalidInput;
                    let errMsg = 'Invalid inputs:\n';
                    for (let key in invalidInput) {
                        errMsg += key + ' ' + invalidInput[key].join() + '\n';
                    }
                    alert(errMsg)
                }
                if (err.status == 401) {
                    this.router.navigate(['/Login']);
                    let errMsg = err.message + ' : ' + err.error
                    console.log(errMsg);
                }
                return Observable.throw(err);
            })
    }

    // this func will determine if to intercept the request, based on the req's url
    interceptionIsNeeded(url: string) {
        if (url != LoginURL && url != RegisterURL && url != VerifyAuthURL && !url.includes("https://s3.eu-central-1.amazonaws.com")) {
            // if req.url is none of the above - intercept
            return true
        } else {
            // url is one of the above - do not intercept
            return false
        }
    }
}
