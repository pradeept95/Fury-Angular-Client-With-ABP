import { Component, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { CalendarEvent, CalendarEventTimesChangedEvent } from 'angular-calendar';
import clone from 'lodash-es/clone';
import * as moment from 'moment';
import { Subject } from 'rxjs';
import { CalendarEditComponent } from './calendar-edit/calendar-edit.component';

@Component({
  selector: 'fury-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  view = 'month';

  refresh: Subject<any> = new Subject();

  activeDayIsOpen = true;

  constructor(private dialog: MatDialog,
              private snackBar: MatSnackBar) {
  }

  actions: any[] = [{
    label: '<i class="icon">mode_edit</i>',
    onClick: ({ event }: { event: CalendarEvent }): void => {
      this.handleEvent('Edited', event);
    }
  }, {
    label: '<i class="icon">delete</i>',
    onClick: ({ event }: { event: CalendarEvent }): void => {
      const foundIndex = this.events.indexOf(event);

      if (foundIndex > -1) {
        this.events = this.events.splice(foundIndex, 1);
      }

      this.snackBar.open('Deleted Event: ' + event.title, 'UNDO', { duration: 3000 })
        .onAction().subscribe(() => {
        this.events.splice(foundIndex, 0, event);
      });
    }
  }];

  viewDate: Date = new Date();

  handleEvent(action: string, event: CalendarEvent<any>): void {
    const eventCopy = clone(event);

    console.log(event);

    const dialogRef = this.dialog.open(CalendarEditComponent, {
      data: event
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        event = result;
        this.snackBar.open('Changed Event: ' + event.title, 'UNDO')
          .onAction().subscribe(() => {
          event = eventCopy;
          this.refresh.next();
        });
        this.refresh.next();
      }
    });
  }

  events: any[] = [{
    start: moment().subtract(1, 'days').toDate(),
    end: moment().add(1, 'days').toDate(),
    title: 'A 3 day event',
    color: {
      primary: '#009688',
      secondary: '#80CBC4'
    },
    actions: this.actions
  }, {
    start: moment().toDate(),
    end: moment().toDate(),
    title: 'A draggable one day event',
    color: {
      primary: '#03A9F4',
      secondary: '#81D4FA'
    },
    actions: this.actions,
    draggable: true
  }, {
    start: moment().add(9, 'days').toDate(),
    end: moment().add(9, 'days').add(1, 'week').toDate(),
    title: 'A long event that spans a week',
    color: {
      primary: '#E91E63',
      secondary: '#F48FB1'
    },
  }, {
    start: moment().subtract(2, 'hours').toDate(),
    end: moment().toDate(),
    title: 'A draggable and resizable event',
    color: {
      primary: '#FF9800',
      secondary: '#FFCC80'
    },
    actions: this.actions,
    resizable: {
      beforeStart: true,
      afterEnd: true
    },
    draggable: true
  }];

  dayClicked({ date, events }: { date: Date, events: CalendarEvent[] }): void {

    if (moment(this.viewDate).isSame(date, 'month')) {
      if (
        (moment(this.viewDate).isSame(date, 'day') && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
        this.viewDate = date;
      }
    }
  }

  eventTimesChanged({ event, newStart, newEnd }: CalendarEventTimesChangedEvent): void {
    event.start = newStart;
    event.end = newEnd;
    this.snackBar.open('Moved Event: \'' + event.title + '\' to ' + newEnd.getDate() + '.' + newEnd.getMonth() + '.' + newEnd.getFullYear());
    this.refresh.next();
  }


  ngOnInit() {
  }

}
