import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { UploadService } from '../../services/upload.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

type pendingUpload = {
    files: FileList,
    payloadSize: number,
    previewURLs: Array<any>
};

@Component({
    selector: 'app-upload',
    templateUrl: './upload.component.html',
    styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

    @ViewChild('filesInput')
    public filesInput: ElementRef

    public pendingUpload: pendingUpload = {
        files: null,
        payloadSize: 0,
        previewURLs: []
    }
    constructor(public uploadService: UploadService) { }

    ngOnInit() {
    }

    selectFiles() {
        debugger;
        this.filesInput.nativeElement.click();
    }

    uploadfiles() {
        if (this.pendingUpload.files && this.pendingUpload.files.length > 0) {
            Observable.fromPromise(this.uploadService.uploadfiles(this.pendingUpload.files))
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
            alert('no files selected');
        }
    }

    onFilesLoaded(input) {
        this.resetPendingUpload();
        this.pendingUpload.files = input.files;
        for (let i = 0; i < this.pendingUpload.files.length; i++) {
            let file = this.pendingUpload.files[i]
            this.previewFile(file);
        }
    }

    previewFile(file) {
        let reader = new FileReader();
        reader.onloadend = (file: any) => {
            console.log('loaded the following:', file)
            this.pendingUpload.previewURLs.push(file.target.result);
            let fileSize = parseFloat((file.total / 1000000).toFixed(3))
            this.pendingUpload.payloadSize += fileSize;
        }
        reader.readAsDataURL(file)
    }

    resetPendingUpload() {
        this.pendingUpload.files = null;
        this.pendingUpload.previewURLs = []
        this.pendingUpload.payloadSize = 0
    }

}