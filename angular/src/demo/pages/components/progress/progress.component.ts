import { Component, OnInit } from '@angular/core';
import escape from 'lodash-es/escape';

@Component({
  selector: 'fury-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.scss']
})
export class ProgressComponent implements OnInit {

  progressHTML =
    escape(`<mat-progress-bar mode="determinate" [value]="40"></mat-progress-bar>
<mat-progress-bar mode="indeterminate" color="primary"></mat-progress-bar>
<mat-progress-bar mode="buffer" color="accent"></mat-progress-bar>
<mat-progress-bar mode="query" color="warn"></mat-progress-bar>`);

  constructor() {
  }

  ngOnInit() {
  }

}
