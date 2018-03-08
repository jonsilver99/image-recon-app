import { Component, OnInit } from '@angular/core';
import { EntryURL } from '../../../environments/environment';

@Component({
    selector: 'app-about',
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

    public entryUrl:string = EntryURL

    constructor() { }

    ngOnInit() {
    }

}
