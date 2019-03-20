import { Component, OnInit } from '@angular/core';
import escape from 'lodash-es/escape';

@Component({
  selector: 'fury-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss']
})
export class CheckboxComponent implements OnInit {

  checkboxHTML =
    escape(`<mat-checkbox>Checkbox</mat-checkbox>
<mat-checkbox color="primary" [checked]="true">Primary</mat-checkbox>
<mat-checkbox color="accent" [checked]="true">Accent</mat-checkbox>
<mat-checkbox color="warn" [checked]="true">Warn</mat-checkbox>
<mat-checkbox disabled [checked]="true">Disabled</mat-checkbox>
<mat-checkbox [indeterminate]="true">Indeterminate</mat-checkbox>`);

  constructor() {
  }

  ngOnInit() {
  }

}
