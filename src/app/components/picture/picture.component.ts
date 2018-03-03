import { Component, OnInit, Input } from '@angular/core';
import { EntryURL } from '../../../environments/environment';
import { PictureData } from '../../models/interfaces';

@Component({
    selector: 'app-picture',
    templateUrl: './picture.component.html',
    styleUrls: ['./picture.component.css']
})
export class PictureComponent implements OnInit {

    @Input()
    public ImgData: PictureData

    constructor() { }

    ngOnInit() {
    }

}
