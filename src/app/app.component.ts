import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { AppLoginState } from './models/interfaces';
import { AppStateService } from './services/app-state.service';
import { LoginService } from './services/login.service';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { ScrollEventsService } from './services/scroll-events.service';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {
    title = 'Photo-Recon-App';
    public LoginState: AppLoginState = { isLoggedIn: false, role: '' }

    // Scrolling events handling
    @ViewChild('scrollableContentBody')
    public scrollableContentBody: ElementRef

    constructor(
        public appState: AppStateService,
        public loginServ: LoginService,
        private scrollEvents: ScrollEventsService
    ) { }

    ngOnInit() {
        //Subscribe to login event
        this.appState.LoginStateEmitter.subscribe(
            (_LoginState: AppLoginState) => {
                this.LoginState = _LoginState;
            },
            (err) => {
                console.log(err);
            },
            () => {
                console.log('App login status changed');
            }
        )
        //Check for previous login session in local storage
        this.loginServ.checkSessionInLocalStorage();
    }

    ngAfterViewInit() {

        // each time the 'content-body' div gets scrolled down to bottom - listen to event and emit a 'bottom-reached' event
        this.scrollEvents.onScrollBottomReached(this.scrollableContentBody);

    }

    appLogout(event) {
        event.preventDefault();
        this.loginServ.logout();
    }
}