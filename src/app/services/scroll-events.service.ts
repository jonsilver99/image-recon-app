import { Injectable, ElementRef } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

// this class will hold subjects emitting key - hallmark scrolling events
@Injectable()
export class ScrollEventsService {

    public scrollBottomReached: Subject<any> = new Subject<any>();

    constructor() { }

    onScrollBottomReached(scrolledElRef: ElementRef) {
        let div = scrolledElRef.nativeElement;
        return Observable.fromEvent(scrolledElRef.nativeElement, "scroll")
            .map((event) => {
                console.log(`Content Scroll height: ${div.scrollHeight}`)
                console.log(`Div height: ${div.clientHeight}`)
                console.log(`Scroll position from top : ${div.scrollTop}`)
                return scrolledElRef.nativeElement.scrollTop;
            })
            .filter((scrollTopValue) => {
                debugger;
                return Math.ceil(scrollTopValue) >= div.scrollHeight - div.clientHeight
            })
            // .distinct()
            .debounceTime(50)
            .subscribe(
            (scrollTopValue) => {
                console.log(`bottom reached`);
                this.scrollBottomReached.next(true);
            },
            (err) => {
                console.log(err);
            }
            )
    }


    scrollExceededElementHeightBy(scrolledElRef: ElementRef, excessFactor: number) {
        return Observable.fromEvent(scrolledElRef.nativeElement, "scroll")
            .map((event) => {
                return scrolledElRef.nativeElement.scrollTop;
            })
            .filter((scrollTopValue) => {
                return scrollTopValue > scrolledElRef.nativeElement.clientHeight * excessFactor
            })
            .distinct()
            .debounceTime(1000)
            .subscribe(
            (scrollTopValue) => {
                console.log(`div (not document) client height: ${scrolledElRef.nativeElement.clientHeight}`)
                console.log(`Scroll from top value: ${scrollTopValue}`)
            },
            (err) => {
                console.log(err);
            }
            )
    }

}