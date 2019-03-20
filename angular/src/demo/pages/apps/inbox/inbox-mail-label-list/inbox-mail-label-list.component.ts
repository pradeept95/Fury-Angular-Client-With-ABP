import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { MatSelectChange } from '@angular/material';
import { Observable } from 'rxjs';
import { InboxService } from '../inbox.service';
import { Color } from '../shared/color.interface';
import { MailLabel } from '../shared/mail-label.interface';

@Component({
  selector: 'fury-inbox-mail-label-list',
  templateUrl: './inbox-mail-label-list.component.html',
  styleUrls: ['./inbox-mail-label-list.component.scss']
})
export class InboxMailLabelListComponent implements OnInit {

  @Input() icon = 'label';
  @Input() availableLabels: MailLabel[];
  @Input() labels: MailLabel[];
  @Output() addLabel = new EventEmitter<MailLabel>();
  @Output() removeLabel = new EventEmitter<MailLabel>();

  labelGroup: FormGroup;
  colors$: Observable<Color[]>;

  @ViewChild(FormGroupDirective) form: FormGroupDirective;

  constructor(private inboxService: InboxService,
              private fb: FormBuilder) {
  }

  ngOnInit() {
    this.labelGroup = this.fb.group({
      color: [null, Validators.required],
      name: [null, Validators.required]
    });

    this.colors$ = this.inboxService.getLabelColors();
  }

  selectLabel(selectChange: MatSelectChange, label: MailLabel) {
    selectChange.value ? this.addLabel.emit(label) : this.removeLabel.emit(label);
  }

  selectLabelButton(clickEvent: Event, label: MailLabel) {
    if (clickEvent) {
      clickEvent.stopPropagation();
    }

    this.labelSelected(label) ? this.removeLabel.emit(label) : this.addLabel.emit(label);
  }

  labelSelected(label: MailLabel) {
    return this.labels.indexOf(label) > -1;
  }

  createLabel() {
    const label = this.labelGroup.value;
    this.addLabel.emit(label);

    setTimeout(() => {
      this.labelGroup.markAsPristine();
      this.labelGroup.markAsUntouched();
      this.form.resetForm();
      this.labelGroup.reset();
    }, 10);
  }
}
