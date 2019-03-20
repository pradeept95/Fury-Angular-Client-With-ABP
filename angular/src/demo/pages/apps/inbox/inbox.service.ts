import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { inboxMails, labelColors } from '../../demo-data/inbox-demo-data';
import { MailLabel } from './shared/mail-label.interface';
import { Mail } from './shared/mail.interface';

@Injectable()
export class InboxService {

  mails = inboxMails;
  availableLabels: MailLabel[] = [];

  lastRemovedMail: Mail;
  lastRemovedMailIndex: number;

  constructor() {
    this.mails.forEach(mail => {
      mail.labels.forEach(label => {
        if (!this.availableLabels.find(l => l.name === label.name)) {
          this.availableLabels.push(label);
        }
      });
    });
  }

  getStarred() {
    return of(this.mails).pipe(
      map(mails => mails.filter(mail => mail.starred))
    );
  }

  getGroup(group: string) {
    return of(this.mails).pipe(
      map(mails => mails.filter(mail => mail.group === group))
    );
  }

  getMail(id: number | string) {
    return of(this.mails).pipe(
      map(mails => mails.find(mail => mail.id === id))
    );
  }

  toggleStarred(mail: Mail) {
    const foundMail = this.find(mail);
    if (foundMail) {
      foundMail.starred = !mail.starred;
    }

  }

  addLabel(label: MailLabel, mail: Mail) {
    const foundMail = this.find(mail);
    if (foundMail) {
      const foundLabel = foundMail.labels.find(l => l === label);
      if (!foundLabel) {
        foundMail.labels.push(label);
        this.addToAvailableIfNotExists(label);
      }
    }
  }

  addToAvailableIfNotExists(label: MailLabel) {
    if (this.availableLabels.indexOf(label) === -1) {
      this.availableLabels.push(label);
    }
  }

  removeLabel(label: MailLabel, mail: Mail) {
    const foundMail = this.find(mail);
    if (foundMail) {
      const foundLabelIndex = foundMail.labels.findIndex(l => l === label);
      if (foundLabelIndex > -1) {
        foundMail.labels.splice(foundLabelIndex, 1);
      }
    }
  }

  removeMail(mail: Mail) {
    const foundMailIndex = this.mails.findIndex(m => m === mail);
    if (foundMailIndex > -1) {
      this.mails.splice(foundMailIndex, 1);
      this.lastRemovedMail = mail;
      this.lastRemovedMailIndex = foundMailIndex;
    }
  }

  undoRemove() {
    if (this.lastRemovedMail && this.lastRemovedMailIndex) {
      this.mails.splice(this.lastRemovedMailIndex, 0, this.lastRemovedMail);
      return this.lastRemovedMail;
    }

    return false;
  }

  find(mail: Mail) {
    return this.mails.find((existingMail) => existingMail.id === mail.id);
  }

  getLabelColors() {
    return of(labelColors);
  }
}
