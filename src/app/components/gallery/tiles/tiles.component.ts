import { OnInit, Component } from '@angular/core';
import { PictureService } from '../../../services/picture.service';
import { Observable } from 'rxjs/Observable';
import { ScrollEventsService } from '../../../services/scroll-events.service';

@Component({
    selector: 'app-tiles',
    templateUrl: './tiles.component.html',
    styleUrls: ['./tiles.component.css']
})
export class TilesComponent implements OnInit {
    // PicNames array Will hold all pics names (string)
    // showingPics array will hold JUST the names of pics that are loaded and showing.  
    // on scroll to bottom event - more pics will be pushed into showingPics - therefor more pics will load & show. 
    public PicNames: Array<string> = [];
    public showingPics: Array<string> = [];
    public showLoadingIndicator: boolean = false;

    constructor(public pictureService: PictureService, private scrollEvents: ScrollEventsService) { }

    appendShowingPicsArr(indexOfLastpic) {
        for (let i = indexOfLastpic; i < indexOfLastpic + 12; i++) {
            if (i == this.PicNames.length) {
                break;
            }
            this.showingPics.push(this.PicNames[i]);
            // console.log(this.showingPics);
        }
    }

    ngOnInit() {
        this.pictureService.getAllPics().subscribe(
            (Names: Array<string>) => {
                this.PicNames = Names;
                for (let i = 0; i < 12; i++) {
                    this.showingPics.push(Names[i]);
                }
                // console.log(this.showingPics);
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
                debugger;
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