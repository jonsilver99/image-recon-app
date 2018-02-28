import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UploadPicURL } from '../../environments/environment';
import 'rxjs/Rx';

@Injectable()
export class UploadService {

    constructor(public http: HttpClient) { }

    uploadfiles(files: any): Observable<any> {
        const formData = new FormData();
        formData.append('uploads', files);
        // uploading multiple files method 1 will show on req.files
        for (let i = 0; i < files.length; i++) {
            formData.append('uploads', files[i], files[i].name);
        }
        // uploading multiple files method 2 - will show up on req.body
        // formData.append('uploads2', JSON.stringify(files));

        return this.http.post(UploadPicURL, formData)
            .map((result) => {
                return result;
            })
            .catch((err: HttpErrorResponse): Observable<any> => {
                return Observable.throw(err)
            })
    }
}