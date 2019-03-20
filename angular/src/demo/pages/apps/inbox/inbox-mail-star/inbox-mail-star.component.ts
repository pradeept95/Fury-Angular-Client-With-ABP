import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'fury-inbox-mail-star',
  templateUrl: './inbox-mail-star.component.html',
  styleUrls: ['./inbox-mail-star.component.scss']
})
export class InboxMailStarComponent implements OnInit {

  @Input() isStarred: boolean;
  @Output() starred = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
  }

  emitClick() {
    this.starred.emit();
  }
}
