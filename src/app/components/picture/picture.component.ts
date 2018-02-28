import { Component, OnInit, Input } from '@angular/core';
import { EntryURL } from '../../../environments/environment';

@Component({
    selector: 'app-picture',
    templateUrl: './picture.component.html',
    styleUrls: ['./picture.component.css']
})
export class PictureComponent implements OnInit {

    @Input()
    public ImgName: string;

    public ImgSrc: string;

    constructor() { }

    ngOnInit() {
        this.ImgSrc = `${EntryURL}/assets/uploads/${this.ImgName}`;
    }

}
