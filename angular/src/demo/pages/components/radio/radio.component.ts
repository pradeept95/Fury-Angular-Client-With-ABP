import { Component, OnInit } from '@angular/core';
import escape from 'lodash-es/escape';

@Component({
  selector: 'fury-radio',
  templateUrl: './radio.component.html',
  styleUrls: ['./radio.component.scss']
})
export class RadioComponent implements OnInit {

  radioHTML = escape(`<mat-radio-group [(ngModel)]="favoriteSeason">
  <mat-radio-button class="radio" *ngFor="let season of seasons" [value]="season">
    {{ season }}
  </mat-radio-button>
</mat-radio-group>`);

  favoriteSeason: string;

  seasons = [
    'Winter',
    'Spring',
    'Summer',
    'Autumn',
  ];

  constructor() {
  }

  ngOnInit() {
  }

}
