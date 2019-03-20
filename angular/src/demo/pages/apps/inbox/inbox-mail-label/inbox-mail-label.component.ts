import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'fury-inbox-mail-label',
  templateUrl: './inbox-mail-label.component.html',
  styleUrls: ['./inbox-mail-label.component.scss']
})
export class InboxMailLabelComponent implements OnInit {

  @Input() color: string;

  constructor() {
  }

  ngOnInit() {
  }
}
