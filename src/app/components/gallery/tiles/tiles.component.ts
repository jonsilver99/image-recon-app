import { OnInit, Component } from '@angular/core';
import { PictureService } from '../../../services/picture.service';
import { Observable } from 'rxjs/Observable';
import { ScrollEventsService } from '../../../services/scroll-events.service';
import { PictureData } from '../../../models/interfaces';

@Component({
    selector: 'app-tiles',
    templateUrl: './tiles.component.html',
    styleUrls: ['./tiles.component.css']
})
export class TilesComponent implements OnInit {
    // allPics array Will hold all pics objects 
    // showingPics array will hold JUST the pictures that are loaded and showing.  
    // on scroll to bottom event - more pics will be pushed into showingPics - therefor more pics will load & show. 
    public allPics: Array<PictureData> = [];
    public showingPics: Array<PictureData> = [];
    public showLoadingIndicator: boolean = false;

    constructor(public pictureService: PictureService, private scrollEvents: ScrollEventsService) { }

    appendShowingPicsArr(indexOfLastpic) {
        for (let i = indexOfLastpic; i < indexOfLastpic + 12; i++) {
            if (i == this.allPics.length) {
                break;
            }
            this.showingPics.push(this.allPics[i]);
        }
    }

    ngOnInit() {
        this.pictureService.getAllPics().subscribe(
            (fetchedPics: Array<PictureData>) => {
                if (fetchedPics.length > 0) {
                    this.allPics = fetchedPics;
                    this.appendShowingPicsArr(0);
                } else {
                    console.log('No pictures in system - please upload');
                }
            },
            (err) => {
                console.log(err);
            },
            () => {
                console.log("Observing complete");
            }
        )

        this.scrollEvents.scrollBottomReached.subscribe(
            (bottomReached: boolean) => {
                if (bottomReached) {
                    this.showLoadingIndicator = true;
                    setTimeout(() => {
                        this.appendShowingPicsArr(this.showingPics.length);
                        this.showLoadingIndicator = false;
                    }, 500)
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
}