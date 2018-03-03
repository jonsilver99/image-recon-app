import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot, ActivatedRouteSnapshot, CanActivateChild } from '@angular/router';
import { LoginService } from './login.service';
import { Observable } from 'rxjs/Observable';
import { HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { AppStateService } from './app-state.service';

@Injectable()
export class RouteGuardService implements CanActivate, CanActivateChild {

    constructor(public loginServ: LoginService, public router: Router, public appState: AppStateService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | boolean {
        // console.log(route);
        debugger;
        let requestedRoute = route.routeConfig.path;
        // If app state is logged in - block access to 'login' and 'register' routes
        if (requestedRoute == 'Login' || requestedRoute == 'Register') {
            // return (this.appState.LoginState.isLoggedIn) ? true : false;
            if (this.appState.LoginState.isLoggedIn) {
                console.log('Route blocked - Already logged in');
                this.router.navigate(['/Gallery/Tiles']);
                return false;
            } else {
                return true;
            }
        }
        else {
            if (this.loginServ.authToken) {
                return this.loginServ.verifyAuth(requestedRoute)
                    .map((verification) => {
                        if (verification == 'ok') {
                            return true
                        } else {
                            this.router.navigate(['/Login']);
                            return false;
                        }
                    }).first()
                    .catch((err: HttpErrorResponse): Observable<any> => {
                        return Observable.throw(err);
                    });

            } else {
                console.log("Route Restricted - please log in first");
                this.router.navigate(['/Login']);
                return false;
            }
        }
    }

    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | boolean {
        return this.canActivate(route, state);
    }
}