import { Component, OnInit } from '@angular/core';
import escape from 'lodash-es/escape';

@Component({
  selector: 'fury-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})
export class CardsComponent implements OnInit {

  cardHTML = escape(`<mat-card>
  <mat-card-header>
    <img mat-card-avatar src="assets/img/avatars/3.jpg">
    <mat-card-subtitle>
      Yesterday
    </mat-card-subtitle>
    <mat-card-title>Gerald Morris</mat-card-title>
  </mat-card-header>
  <img mat-card-image src="assets/img/backgrounds/1.jpg">
  <mat-card-content>
    <p>Piqued favour stairs it enable exeter as seeing. Remainder met improving but engrossed sincerity age. Better but length gay denied abroad are. Attachment astonished to on appearance imprudence so collecting in excellence. Tiled way blind lived whose new. The for fully had she there leave merit enjoy forth. </p>
  </mat-card-content>
  <mat-divider></mat-divider>
  <mat-card-actions>
    <div fxLayout="row">
      <button mat-icon-button>
        <mat-icon>share</mat-icon>
      </button>
      <button mat-icon-button>
        <mat-icon>favorite</mat-icon>
      </button>
      <span fxFlex></span>
      <button mat-button>
        More Info
      </button>
      <button mat-button>
        Save as
      </button>
    </div>
  </mat-card-actions>
</mat-card>`);

  constructor() { }

  ngOnInit() {
  }
}
