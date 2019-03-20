import { Component, OnInit } from '@angular/core';
import escape from 'lodash-es/escape';

@Component({
  selector: 'fury-tooltip',
  templateUrl: './tooltip.component.html',
  styleUrls: ['./tooltip.component.scss']
})
export class TooltipComponent implements OnInit {

  tooltipHTML = escape(`<button mat-icon-button matTooltip="Favorite this">
  <mat-icon>favorite</mat-icon>
</button>`);

  constructor() { }

  ngOnInit() {
  }
}
