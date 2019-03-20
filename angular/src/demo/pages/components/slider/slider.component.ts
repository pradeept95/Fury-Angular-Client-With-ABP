import { Component, OnInit } from '@angular/core';
import escape from 'lodash-es/escape';

@Component({
  selector: 'fury-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit {

  sliderHTML = escape(`<mat-slider min="1" max="10" thumbLabel tickInterval="1"></mat-slider>`);

  constructor() {
  }

  ngOnInit() {
  }
}
