import { Component, OnInit } from '@angular/core';
import escape from 'lodash-es/escape';

@Component({
  selector: 'fury-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  menuHTML = escape(`<button mat-icon-button [mdMenuTriggerFor]="menu">
  <mat-icon>more_vert</mat-icon>
</button>

<mat-menu #menu="mdMenu">
  <button mat-menu-item>
    <mat-icon> dialpad </mat-icon>
    <span> Redial </span>
  </button>
  <button mat-menu-item disabled>
    <mat-icon> voicemail </mat-icon>
    <span> Check voicemail </span>
  </button>
  <button mat-menu-item>
    <mat-icon> notifications_off </mat-icon>
    <span> Disable alerts </span>
  </button>
</mat-menu>`);

  constructor() { }

  ngOnInit() {
  }
}
