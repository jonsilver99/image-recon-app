import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ReconPicURL, GetPicURL, LikPicURL } from '../../environments/environment';
import 'rxjs/Rx';
import { LoginService } from './login.service';
import { Subject } from 'rxjs/Subject';


@Injectable()
export class PictureService {

    public PicNames: Array<string> = [];

    constructor(public http: HttpClient, public loginStatus: LoginService) { }

    getAllPics(): Observable<any> {
        // If Service already holds the PicNames data (pictues have already been fetched from server) then return those pictures.
        // Otherwise fetch from server
        if (this.PicNames.length > 0) {
            return Observable.of(this.PicNames);
        } else {
            return this.http.get(GetPicURL)
                .map((Names: Array<string>) => {
                    this.PicNames = Names;
                    return this.PicNames;
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