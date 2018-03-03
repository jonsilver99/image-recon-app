import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ReconPicURL, GetPicURL, LikPicURL } from '../../environments/environment';
import 'rxjs/Rx';
import { LoginService } from './login.service';
import { Subject } from 'rxjs/Subject';
import { PictureData } from '../models/interfaces';


@Injectable()
export class PictureService {

    public fetchedPics: Array<PictureData> = [];

    constructor(public http: HttpClient, public loginStatus: LoginService) { }

    getAllPics(): Observable<any> {
        // If Service already holds the fetchedPics data (pictues have already been fetched from server) then return this data.
        // Otherwise fetch from server
        if (this.fetchedPics.length > 0) {
            return Observable.of(this.fetchedPics);
        } else {
            return this.http.get(GetPicURL)
                .map((results: Array<PictureData>) => {
                    this.fetchedPics = results;
                    return this.fetchedPics;
                })
                .catch((err: HttpErrorResponse): Observable<any> => {
                    return Observable.throw(err)
                });
        }
    }

    reconImage(picName: string): Observable<any> {
        return this.http.get(ReconPicURL + '/' + picName)
            .catch((err: HttpErrorResponse): Observable<any> => {
                return Observable.throw(err)
            });
    }

    likePicture(picName: string) {
        return this.http.post(LikPicURL, { pic: picName }, { responseType: 'json' })
    }
}