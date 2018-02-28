import { HostListener, ElementRef, Renderer2, Directive } from '@angular/core';

@Directive({
    selector: '[appHighlight]'
})
export class HighlightDirective {

    constructor(public elRef: ElementRef, public renderer: Renderer2) { }

    @HostListener("mouseenter")
    onHover() {
        this.renderer.addClass(this.elRef.nativeElement, "highlighted");
    }

    @HostListener("mouseleave")
    unHover() {
        this.renderer.removeClass(this.elRef.nativeElement, "highlighted");
    }


}
