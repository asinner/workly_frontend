import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[wk-tooltip]'
})
export class TooltipDirective {
    @Input('wk-tooltip') wkTooltip: string;
    constructor(private elementRef: ElementRef) { }

    @HostListener('mouseenter')
    show() {
        console.log(this.wkTooltip);
    }
}
