import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'fury-inbox-mail-confirm-dialog',
  templateUrl: './inbox-mail-confirm-dialog.component.html',
  styleUrls: ['./inbox-mail-confirm-dialog.component.scss']
})
export class InboxMailConfirmDialogComponent implements OnInit {

  content: string;

  constructor(@Inject(MAT_DIALOG_DATA) private options: any,
              private dialogRef: MatDialogRef<InboxMailConfirmDialogComponent>) {
  }

  ngOnInit() {
    this.content = this.options.content;
  }

  cancel() {
    this.dialogRef.close(false);
  }

  confirm() {
    this.dialogRef.close(true);
  }
}
