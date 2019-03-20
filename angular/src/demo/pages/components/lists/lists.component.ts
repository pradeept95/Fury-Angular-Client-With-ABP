import { Component, OnInit } from '@angular/core';
import escape from 'lodash-es/escape';

@Component({
  selector: 'fury-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.scss']
})
export class ListsComponent implements OnInit {

  listHTML =
    escape(`<mat-list class="list mat-elevation-z1">
  <h3 mat-subheader>Contacts</h3>
  <mat-list-item>
    <img mat-list-avatar src="assets/img/avatars/1.jpg">
    <h3 matLine>John</h3>
    <p matLine>
      <span>Brunch?</span>
      <span class="subline">-- Did you want to go on Sunday? I was thinking</span>
    </p>
  </mat-list-item>
  <mat-list-item>
    <img mat-list-avatar src="assets/img/avatars/2.jpg">
    <h3 matLine>Peter</h3>
    <p matLine>
      <span>Summer BBQ</span>
      <span class="subline">-- Wish I could come, but I have some special</span>
    </p>
  </mat-list-item>
  <mat-list-item>
    <img mat-list-avatar src="assets/img/avatars/3.jpg">
    <h3 matLine>Nancy</h3>
    <p matLine>
      <span>Oui oui</span>
      <span class="subline">-- Have you booked the Paris trip?</span>
    </p>
  </mat-list-item>
  <mat-divider></mat-divider>
  <h3 mat-subheader>Other</h3>
  <mat-list-item>
    <img mat-list-avatar src="assets/img/avatars/4.jpg">
    <h3 matLine>Frank</h3>
    <p matLine>
      <span>Pretty decent!</span>
      <span class="subline">-- You look pretty... decent!</span>
    </p>
  </mat-list-item>
  <mat-list-item>
    <img mat-list-avatar src="assets/img/avatars/5.jpg">
    <h3 matLine>Donald</h3>
    <p matLine>
      <span>That's great!</span>
      <span class="subline">-- Great work mate!</span>
    </p>
  </mat-list-item>
</mat-list>`);

  constructor() { }

  ngOnInit() {
  }
}
