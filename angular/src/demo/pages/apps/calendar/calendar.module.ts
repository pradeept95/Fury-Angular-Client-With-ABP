import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CalendarModule } from 'angular-calendar'; 
import { CalendarEditComponent } from './calendar-edit/calendar-edit.component';
import { CalendarRoutingModule } from './calendar-routing.module';
import { CalendarComponent } from './calendar.component';
import { MaterialModule } from '@shared/app-shared/material-components.module';
import { ScrollbarModule } from '@shared/app-shared/scrollbar/scrollbar.module';

@NgModule({
  imports: [
    CommonModule,
    CalendarRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    CalendarModule.forRoot(),
    ScrollbarModule
  ],
  declarations: [CalendarComponent, CalendarEditComponent],
  entryComponents: [CalendarEditComponent]
})
export class CalendarAppModule {
}
