import { HostListener, ElementRef, Renderer2, Directive, OnInit, AfterViewInit } from '@angular/core';
import { PictureService } from '../services/picture.service';
import { AppStateService } from '../services/app-state.service';
import { LoginService } from '../services/login.service';
import { AppLoginState } from '../models/interfaces';

type result = {
    status: string,
    msg: string,
    likePic: boolean,
    picName: string
};

@Directive({
    selector: '[appLikeHeart]'
})
export class LikeHeartDirective implements AfterViewInit {

    constructor(
        public elRef: ElementRef,
        public renderer: Renderer2,
        public loginServ: LoginService,
        public pictureService: PictureService,
        public appState: AppStateService

    ) { }

    @HostListener("click")
    likeClicked() {
        console.log(this.elRef.nativeElement.id);
        this.pictureService.likePicture(this.elRef.nativeElement.id)
            .subscribe(
            (res: result) => {
                let sessionData: AppLoginState = this.appState.LoginState;
                let picsThisUserLikes = sessionData.liked_pictures;
                if (res.status == 'ok') {
                    if (res.likePic) {
                        picsThisUserLikes.push(res.picName);
                        this.loginServ.updateSessionDataInLocalStorage(sessionData)
                        this.renderer.addClass(this.elRef.nativeElement, "like-heart-liked");
                    }
                    if (!res.likePic) {
                        picsThisUserLikes.splice(picsThisUserLikes.indexOf(res.picName, 1))
                        this.loginServ.updateSessionDataInLocalStorage(sessionData)
                        this.renderer.removeClass(this.elRef.nativeElement, "like-heart-liked");
                    }
                }
            },

            err => { console.log(err) },


            () => { console.log("Observing complete") }

            )
    }

    ngOnInit() {

    }

    ngAfterViewInit() {
        if (this.appState.LoginState.liked_pictures.includes(this.elRef.nativeElement.id)) {
            this.renderer.addClass(this.elRef.nativeElement, "like-heart-liked");
        }
    }
}
