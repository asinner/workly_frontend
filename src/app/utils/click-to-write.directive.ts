import { ElementRef, Directive, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[clickToWrite]'
})
export class ClickToWriteDirective {
  @Input('clickToWrite') editable;

  constructor(private elementRef: ElementRef) { 
  }

  ngOnInit() {
    this.editable.addEventListener('blur', this.disable.bind(this));
  }

  ngAfterViewInit() {
    this.disable();
  }

  @HostListener('dblclick')
  private enable() {
    this.editable.disabled = false;
    this.editable.readOnly = false;
    this.editable.focus();
  }

  private disable() {
    this.editable.disabled = true;
    this.editable.readOnly = true;
  }

}
