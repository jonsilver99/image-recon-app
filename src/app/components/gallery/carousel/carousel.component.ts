import { OnInit, Component } from '@angular/core';
import { PictureService } from '../../../services/picture.service';

@Component({
    selector: 'app-carousel',
    templateUrl: './carousel.component.html',
    styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit {

    public PicNames: Array<string> = [];

    constructor(public pictureService: PictureService) {
        this.pictureService.getAllPics().subscribe(
            (Names: Array<string>) => {
                for (let pic of Names) {
                    let randomIndex = Math.floor(Math.random() * 9 + 1)
                    this.PicNames.push(Names[randomIndex]);
                    if (this.PicNames.length == 9) {
                        break;
                    }
                }
            },
            (err) => {
                console.log(err);
            },
            () => {
                console.log("Observing complete");
            }
        )
    }

    ngOnInit() {
    }
}
