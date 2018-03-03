import { NgModule, Component, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from '../components/login/login.component';
import { RegistrationComponent } from '../components/registration/registration.component';
import { GalleryComponent } from '../components/gallery/gallery.component';
import { PictureComponent } from '../components/picture/picture.component';
import { FullDetailedPictureComponent } from '../components/full-detailed-picture/full-detailed-picture.component';
import { UploadComponent } from '../components/upload/upload.component';
import { CarouselComponent } from '../components/gallery/carousel/carousel.component';
import { TilesComponent } from '../components/gallery/tiles/tiles.component';

import { RouteGuardService } from '../services/route-guard.service';

const appRoutes: Routes = [
    { path: 'Login', component: LoginComponent, canActivate: [RouteGuardService] },
    { path: 'Register', component: RegistrationComponent, canActivate: [RouteGuardService] },
    {
        path: 'Gallery', component: GalleryComponent, canActivate: [RouteGuardService], canActivateChild: [RouteGuardService], children: [
            { path: 'Tiles', component: TilesComponent },
            { path: 'Carousel', component: CarouselComponent },
            { path: '', redirectTo: 'Tiles', pathMatch: 'full' },
            { path: '**', redirectTo: 'Tiles', pathMatch: 'full' }
        ]
    },
    { path: 'Upload', component: UploadComponent, canActivate: [RouteGuardService] },
    { path: 'FullPic/:name/:url', component: FullDetailedPictureComponent, canActivate: [RouteGuardService] },
    { path: '', redirectTo: 'Login', pathMatch: 'full' },
    { path: '**', redirectTo: 'Login', pathMatch: 'full' },
];

const appRouter: ModuleWithProviders = RouterModule.forRoot(appRoutes);

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        appRouter
    ],
    declarations: []
})
export class AppRouterModule { }