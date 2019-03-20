import { AfterContentInit, Directive, ElementRef, Input, NgZone } from '@angular/core';
import defaultsDeep from 'lodash-es/defaultsDeep';
import SimpleBar from 'simplebar';
import { scrollbarOptions } from './scrollbar-options';

@Directive({
  selector: '[furyScrollbar]'
})
export class ScrollbarDirective implements AfterContentInit {

  @Input('furyScrollbar') options: Partial<any>;

  scrollbarRef: SimpleBar;

  constructor(private _element: ElementRef,
              private zone: NgZone) {
  }

  ngAfterContentInit() {
    const options = defaultsDeep(this.options, scrollbarOptions);

    this.zone.runOutsideAngular(() => {
      this.scrollbarRef = new SimpleBar(this._element.nativeElement, options);
    });
  }
}
