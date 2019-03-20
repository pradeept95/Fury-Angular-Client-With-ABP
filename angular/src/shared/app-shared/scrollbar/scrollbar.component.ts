import { Component, ElementRef, NgZone, OnInit } from '@angular/core';
import SimpleBar from 'simplebar';
import { scrollbarOptions } from './scrollbar-options';

@Component({
  selector: 'fury-scrollbar',
  templateUrl: './scrollbar.component.html',
  styleUrls: ['./scrollbar.component.scss']
})
export class ScrollbarComponent implements OnInit {

  scrollbarRef: SimpleBar;
  element: ElementRef;

  constructor(
    private _element: ElementRef,
    private zone: NgZone
  ) { }

  ngOnInit() {
    this.element = this._element;

    this.zone.runOutsideAngular(() => {
      this.scrollbarRef = new SimpleBar(this.element.nativeElement, scrollbarOptions);
    });
  }
}
