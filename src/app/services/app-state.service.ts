import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { AppLoginState } from '../models/interfaces';

@Injectable()
export class AppStateService {


    public LoginState: AppLoginState = { isLoggedIn: false, role: '' }
    public LoginStateEmitter: Subject<any> = new Subject<any>();

    constructor() { }

    declareLoginState(_LoginState: AppLoginState) {
        this.LoginState = _LoginState;
        this.LoginStateEmitter.next(this.LoginState);
    }


}