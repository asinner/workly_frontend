import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[resize]'
})
export class ResizeDirective {

  constructor(private elementRef: ElementRef) { }

  ngAfterViewInit() {
    this.delayResize()
  }

  private resize() {
    let e = this.elementRef.nativeElement; 
    e.style.height = 'auto';
    e.style.height = e.scrollHeight + 'px';
  }

  @HostListener('change')
  @HostListener('cut')
  @HostListener('paste')
  @HostListener('drop')
  @HostListener('keydown')
  delayResize() {
    setTimeout(this.resize.bind(this), 0)
  }


}
