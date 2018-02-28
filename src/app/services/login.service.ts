import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { LoginURL, VerifyAuthURL } from '../../environments/environment';
import 'rxjs/Rx';
import { Subject } from 'rxjs/Subject';
import { AppStateService } from './app-state.service';
import { LoginRequestStatus, AppLoginState } from '../models/interfaces';
import { Router } from '@angular/router';

@Injectable()
export class LoginService {

    public authToken: any = '';
    constructor(public httpReqs: HttpClient, public appState: AppStateService, public router: Router) { }

    checkSessionInLocalStorage(): void {
        // Check if previous login session exists in local storage
        let Session: LoginRequestStatus = JSON.parse(localStorage.getItem('Photo-Recon-App'));
        if (Session) {
            this.authToken = Session.token;
            this.appState.declareLoginState(Session.loginState);
        }
    }

    updateSessionDataInLocalStorage(newLoginState: AppLoginState) {
        let newSessionData: LoginRequestStatus = { token: this.authToken, loginState: newLoginState }
        localStorage.setItem('Photo-Recon-App', JSON.stringify(newSessionData));
    }

    loginRequest(userData: { username: string, password: string }) {

        if (this.appState.LoginState.isLoggedIn) {
            return Observable.of("Already Logged-in - login request aborted");
        }
        else {
            return this.httpReqs.post(LoginURL, { user: userData }, { responseType: 'json' })
                .map((requestStatus: LoginRequestStatus) => {
                    // Upon Successful login
                    localStorage.setItem('Photo-Recon-App', JSON.stringify(requestStatus));
                    this.authToken = requestStatus.token;
                    this.appState.declareLoginState(requestStatus.loginState)
                    this.router.navigate(['/Gallery/Tiles']);
                    return `Logged-in as '${requestStatus.loginState.role}' with JWT token : ${this.authToken}`;
                })
                .catch((err: HttpErrorResponse): Observable<any> => {
                    return Observable.throw(err)
                });
        }
    }

    logout() {
        let appLogout: AppLoginState = { isLoggedIn: false, role: '' }
        localStorage.removeItem('Photo-Recon-App');
        this.authToken = '';
        this.appState.declareLoginState(appLogout);
        this.router.navigate(['/Login']);
    }

    // Used in conjuction with canActivate - to verify client routes access permission
    verifyAuth(clientRoute: string) {
        const header = new HttpHeaders({ 'authorization': this.authToken });
        const params = new HttpParams().set('clientRoute', clientRoute);
        return this.httpReqs.get(VerifyAuthURL, { headers: header, params: params, responseType: 'text' })
    }
}