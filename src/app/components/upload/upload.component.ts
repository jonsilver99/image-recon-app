import { Component, OnInit } from '@angular/core';
import { UploadService } from '../../services/upload.service';


@Component({
    selector: 'app-upload',
    templateUrl: './upload.component.html',
    styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

    public uploadCandidates: FileList;
    constructor(public uploadService: UploadService) { }

    ngOnInit() {
    }

    uploadfiles() {
        if (this.uploadCandidates) {
            this.uploadService.uploadfiles(this.uploadCandidates)
                .subscribe((res) => {
                    alert(res);
                },
                (err) => {
                    alert(err);
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
