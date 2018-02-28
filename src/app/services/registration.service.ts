import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { AppStateService } from './app-state.service';
import { Observable } from 'rxjs/Observable';
import { RegisterURL } from '../../environments/environment';
import 'rxjs/Rx';

@Injectable()
export class RegistrationService {

    constructor(private httpReqs: HttpClient, public appState: AppStateService) { }

    registerNewUserRequest(userData: { username: string, password: string, role: string }) {
        if (this.appState.LoginState.isLoggedIn) {
            return Observable.of("Already Logged-in - registration request aborted");
        } else {
            return this.httpReqs.post(RegisterURL, { user: userData }, { responseType: 'text' })
                .map((res: any) => {
                    return res;
                })
                .catch((err: HttpErrorResponse) => {
                    return Observable.throw(err);
                })
        }
    }

}
