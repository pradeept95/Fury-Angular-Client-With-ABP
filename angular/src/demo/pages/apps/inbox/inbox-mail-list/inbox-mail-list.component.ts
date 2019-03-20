import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { InboxService } from '../inbox.service';
import { Mail } from '../shared/mail.interface';

@Component({
  selector: 'fury-inbox-mail-list',
  templateUrl: './inbox-mail-list.component.html',
  styleUrls: ['./inbox-mail-list.component.scss']
})
export class InboxMailListComponent implements OnInit {

  mails$: Observable<Mail[]>;

  constructor(private route: ActivatedRoute,
              private inboxService: InboxService) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      if (paramMap.get('category') === 'starred') {
        this.mails$ = this.inboxService.getStarred().pipe(
          map(mails => mails.sort((a: any, b: any) => b.when - a.when))
        );
      } else {
        this.mails$ = this.inboxService.getGroup(paramMap.get('category')).pipe(
          map(mails => mails.sort((a: any, b: any) => b.when - a.when))
        );
      }
    });
  }

  toggleStarred(mail: Mail) {
    this.inboxService.toggleStarred(mail);
  }
}
