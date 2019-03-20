import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import escape from 'lodash-es/escape';

@Component({
  selector: 'fury-dialogs',
  templateUrl: './dialogs.component.html',
  styleUrls: ['./dialogs.component.scss']
})
export class DialogsComponent {

  result: string;

  dialogHTML =
    escape(`<button mat-raised-button type="button" (click)="openDialog()" color="primary">Open Dialog</button>
<p *ngIf="result">You chose: {{ result }}</p>
`);

  constructor(private dialog: MatDialog) {
  }

  openDialog() {
    this.dialog.open(DemoDialogComponent, {
      disableClose: false
    }).afterClosed().subscribe(result => {
      this.result = result;
    });
  }
}

@Component({
  selector: 'fury-demo-dialog',
  template: `
    <div mat-dialog-title fxLayout="row" fxLayoutAlign="space-between center">
      <div>Question</div>
      <button type="button" mat-icon-button (click)="close('No answer')" tabindex="-1">
        <mat-icon>close</mat-icon>
      </button>
    </div>

    <mat-dialog-content>
      <p>Do you like Pizza?</p>
    </mat-dialog-content>


    <mat-dialog-actions align="end">
      <button mat-button (click)="close('No')">No</button>
      <button mat-button color="primary" (click)="close('Yes')">Yes</button>
  </mat-dialog-actions>
  `
})
export class DemoDialogComponent {
  constructor(private dialogRef: MatDialogRef<DemoDialogComponent>) {
  }

  close(answer: string) {
    this.dialogRef.close(answer);
  }
}
