import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UploadPicURL} from '../../environments/environment';
import { PutObjectRequest, ClientConfiguration } from 'aws-sdk/clients/s3';
import 'rxjs/Rx';

@Injectable()
export class UploadService {

    constructor(public http: HttpClient) { }

    uploadfiles(files: FileList) {
        if (!files) {
            return Promise.resolve('no files given')
        }
        let formData = new FormData();
        // uploading multiple files method 1 will show on req.body
        for (let i = 0; i < files.length; i++) {
            formData.append('upload_candidates', files[i], files[i].name);
        }
        return this.http.post(UploadPicURL, formData, { responseType: 'text' }).toPromise()
    }
}