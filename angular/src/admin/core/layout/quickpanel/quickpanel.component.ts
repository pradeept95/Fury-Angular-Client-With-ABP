import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'fury-quickpanel',
  templateUrl: './quickpanel.component.html',
  styleUrls: ['./quickpanel.component.scss']
})
export class QuickpanelComponent implements OnInit {

  todayDay: string;
  todayDate: string;
  todayDateSuffix: string;
  todayMonth: string;

  constructor() { }

  ngOnInit() {
    this.todayDay = moment().format('dddd');
    this.todayDate = moment().format('Do');
    this.todayDate = this.todayDate.replace(/\D/g, '');
    this.todayDateSuffix = moment().format('Do');
    this.todayDateSuffix = this.todayDateSuffix.replace(/[0-9]/g, '');
    this.todayMonth = moment().format('MMMM');
  }

}
