import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'fury-inbox-compose',
  templateUrl: './inbox-compose.component.html',
  styleUrls: ['./inbox-compose.component.scss']
})
export class InboxComposeComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<InboxComposeComponent>) {
  }

  ngOnInit() {
  }

}
