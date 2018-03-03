import { OnInit, Component } from '@angular/core';
import { PictureService } from '../../../services/picture.service';
import { EntryURL } from '../../../../environments/environment';
import { PictureData } from '../../../models/interfaces';

@Component({
    selector: 'app-carousel',
    templateUrl: './carousel.component.html',
    styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit {

    public rollingPics: Array<PictureData> = [];
    public imagePath: string = `${EntryURL}/assets/uploads`;
    

    constructor(public pictureService: PictureService) {
        this.pictureService.getAllPics().subscribe(
            (fetchedPics: Array<PictureData>) => {
                for (let pic of fetchedPics) {
                    let randomIndex = Math.floor(Math.random() * 9 + 1)
                    this.rollingPics.push(fetchedPics[randomIndex]);
                    if (this.rollingPics.length == 9) {
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
