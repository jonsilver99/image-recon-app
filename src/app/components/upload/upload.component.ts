import { Component, OnInit } from '@angular/core';
import { UploadService } from '../../services/upload.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';


@Component({
    selector: 'app-upload',
    templateUrl: './upload.component.html',
    styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

    public previewURLs: Array<any> = [];
    public uploadCandidates: FileList;
    constructor(public uploadService: UploadService) { }

    ngOnInit() {
    }

    uploadfiles() {
        if (this.uploadCandidates) {
            Observable.fromPromise(this.uploadService.uploadfiles(this.uploadCandidates), )
                .subscribe((res: any) => {
                    alert(res)
                    console.log(res);
                },
                (err) => {
                    alert('error occoured check console');
                    console.log(err);
                },
                () => {
                    console.log("Observing complete");
                }
                );
        } else {
            console.log('no files selected');
        }
    }

    onFilesLoaded(input) {
        this.uploadCandidates = input.files;
        console.log(this.uploadCandidates);
    }
}