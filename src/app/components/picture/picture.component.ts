import { Component, OnInit, Input } from '@angular/core';

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
        this.ImgSrc = `http://localhost:4400/assets/uploads/${this.ImgName}`;
    }

}
