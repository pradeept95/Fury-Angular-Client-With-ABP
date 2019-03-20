import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { InboxComposeComponent } from './inbox-compose/inbox-compose.component';

@Component({
  selector: 'fury-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.scss']
})
export class InboxComponent implements OnInit {

  constructor(private dialog: MatDialog) {
  }

  ngOnInit() {
  }

  openCompose() {
    this.dialog.open(InboxComposeComponent);
  }
}
