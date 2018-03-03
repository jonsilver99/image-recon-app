import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PictureService } from '../../services/picture.service';
import { EntryURL } from '../../../environments/environment';

@Component({
    selector: 'app-full-detailed-picture',
    templateUrl: './full-detailed-picture.component.html',
    styleUrls: ['./full-detailed-picture.component.css']
})
export class FullDetailedPictureComponent implements OnInit {

    public imageName: string = '';
    public imageURL: string = '';
    public imageTags: Array<any> = []

    constructor(private activeRoute: ActivatedRoute, public pictureService: PictureService) { }

    ngOnInit() {
        this.activeRoute.params.subscribe((params) => {
            debugger;
            this.imageName = params.name;
            this.imageURL = params.url;

            this.pictureService.reconImage(this.imageName).subscribe(
                (tags) => {
                    this.imageTags = tags;
                    console.log(tags);
                },
                (err) => {
                    console.log(err);
                },
                () => {
                    console.log("Observing complete");
                }
            )
        });
    }
}