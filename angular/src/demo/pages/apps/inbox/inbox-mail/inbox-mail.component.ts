import { Component, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { InboxMailConfirmDialogComponent } from '../inbox-mail-confirm-dialog/inbox-mail-confirm-dialog.component';
import { InboxService } from '../inbox.service';
import { MailLabel } from '../shared/mail-label.interface';
import { Mail } from '../shared/mail.interface';

@Component({
  selector: 'fury-inbox-mail',
  templateUrl: './inbox-mail.component.html',
  styleUrls: ['./inbox-mail.component.scss']
})
export class InboxMailComponent implements OnInit {

  id: number | string;
  mail$: Observable<Mail>;
  availableLabels: MailLabel[];
  private _mail: Mail;

  replying: boolean;

  constructor(private route: ActivatedRoute,
              private inboxService: InboxService,
              private dialog: MatDialog,
              private router: Router,
              private snackbar: MatSnackBar) {
  }

  ngOnInit() {
    this.availableLabels = this.inboxService.availableLabels;

    this.route.paramMap.subscribe(paramMap => {
      this.id = paramMap.get('id');
      this.mail$ = this.inboxService.getMail(this.id);

      this.inboxService.getMail(this.id).subscribe(mail => {
        this._mail = mail;
      });
    });
  }

  toggleStarred() {
    this.inboxService.toggleStarred(this._mail);
  }

  addLabel(label: MailLabel) {
    this.inboxService.addLabel(label, this._mail);
  }

  removeLabel(label: MailLabel) {
    this.inboxService.removeLabel(label, this._mail);
  }

  removeMail() {
    this.dialog.open(InboxMailConfirmDialogComponent, {
      data: {
        content: 'Are you sure you want to delete this mail?'
      }
    }).afterClosed().subscribe(confirmed => {
      if (confirmed) {
        this.inboxService.removeMail(this._mail);
        this.router.navigate(['../../'], { relativeTo: this.route });
        this.snackbar.open(`You deleted the mail from: ${this._mail.from.name}`, 'UNDO', {
          duration: 3000
        })
          .onAction().subscribe(() => {
          const mail = this.inboxService.undoRemove();
          if (mail) {
            this.router.navigate(['/apps/inbox/mail', mail.id]);
            this.snackbar.open(`Restored your mail from: ${mail.from.name}`, null, {
              duration: 3000
            });
          } else {
            this.snackbar.open('Could not UNDO last delete action. Sorry!', null, {
              duration: 3000
            });
          }
        });
      }
    });
  }

  showReply() {
    this.replying = true;
  }

  hideReply(send?: boolean) {
    this.replying = false;

    if (send) {
      this.snackbar.open(`You replied to ${this._mail.from.name}`, 'UNDO', {
        duration: 3000
      });
    }
  }
}
