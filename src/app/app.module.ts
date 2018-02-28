import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppRouterModule } from './app-router/app-router.module';

import { AppComponent } from './app.component';
import { GalleryComponent } from './components/gallery/gallery.component';
import { UploadComponent } from './components/upload/upload.component';
import { PictureComponent } from './components/picture/picture.component';
import { FullDetailedPictureComponent } from './components/full-detailed-picture/full-detailed-picture.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { LoginComponent } from './components/login/login.component';



import { PictureService } from './services/picture.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { UploadService } from './services/upload.service';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginService } from './services/login.service';
import { RouteGuardService } from './services/route-guard.service';
import { InterceptorService } from './services/interceptor.service';
import { AppStateService } from './services/app-state.service';
import { RegistrationService } from './services/registration.service';
import { HighlightDirective } from './directives/highlight.directive';
import { CarouselComponent } from './components/gallery/carousel/carousel.component';
import { TilesComponent } from './components/gallery/tiles/tiles.component';
import { LikeHeartDirective } from './directives/like-heart.directive';
import { ScrollEventsService } from './services/scroll-events.service';


@NgModule({
    declarations: [
        AppComponent,
        GalleryComponent,
        UploadComponent,
        PictureComponent,
        FullDetailedPictureComponent,
        LoginComponent,
        RegistrationComponent,
        HighlightDirective,
        CarouselComponent,
        TilesComponent,
        LikeHeartDirective
    
    ],
    imports: [
        ReactiveFormsModule,
        BrowserModule,
        AppRouterModule,
        RouterModule,
        HttpClientModule
    ],
    providers: [
        PictureService,
        UploadService,
        LoginService,
        RegistrationService,
        RouteGuardService,
        AppStateService,
        ScrollEventsService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: InterceptorService,
            multi: true
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
