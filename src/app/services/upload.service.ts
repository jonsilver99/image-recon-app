import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UploadPicURL } from '../../environments/environment';
import { PutObjectRequest, ClientConfiguration } from 'aws-sdk/clients/s3';
import { AwsService } from './aws-service.service';
import 'rxjs/Rx';

@Injectable()
export class UploadService {

    constructor(public http: HttpClient, private AWS: AwsService) { }

    uploadfiles(files: FileList) {
        let uploadAllFiles: Array<Promise<any>> = []
        for (let i = 0; i < files.length; i++) {
            uploadAllFiles.push(this.uploadFileToS3Bucket(files[i]))
        }

        return Promise.all(uploadAllFiles)
            .then((uploaded) => {
                return this.saveFileNamesToServer(uploaded.map((file) => {
                    return file.Key;
                }))
            })
            .then((result: string | any) => {
                return result;
            })
            .catch(err => {
                throw (err);
            })
    }

    uploadFileToS3Bucket(file: File): Promise<any> {
        if (!file) {
            return Promise.resolve('no file given')
        }
        const s3 = new this.AWS.Service.S3({ params: { Bucket: this.AWS.BucketName } });
        let uploadParams: PutObjectRequest = { Bucket: this.AWS.BucketName, Key: file.name, Body: file };
        return new Promise((resolve, reject) => {
            s3.upload(uploadParams, (err, data) => {
                if (err) {
                    reject(err);

                } else {
                    resolve(data);
                }
            })
        })
    }

    saveFileNamesToServer(fileNames: any) {
        const formData = new FormData();
        // uploading multiple files method 1 will show on req.body
        for (let i = 0; i < fileNames.length; i++) {
            formData.append('uploaded_files_names', fileNames[i]);
        }
        return this.http.post(UploadPicURL, formData, { responseType: 'text' }).toPromise()
    }

}