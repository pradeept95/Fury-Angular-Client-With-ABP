import { Component, OnInit } from '@angular/core';
import escape from 'lodash-es/escape';

@Component({
  selector: 'fury-progress-spinner',
  templateUrl: './progress-spinner.component.html',
  styleUrls: ['./progress-spinner.component.scss']
})
export class ProgressSpinnerComponent implements OnInit {

  progressSpinnerHTML = escape(`<mat-progress-spinner mode="determinate" [value]="40"></mat-progress-spinner>
<mat-progress-spinner mode="indeterminate" color="accent"></mat-progress-spinner>`);

  constructor() {
  }

  ngOnInit() {
  }

}
