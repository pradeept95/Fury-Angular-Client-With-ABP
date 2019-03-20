import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FuryCardModule } from '../../card/card.module';
import { MaterialModule } from '../../material-components.module';
import { RealtimeUsersWidgetComponent } from './realtime-users-widget.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,

    // Core
    FuryCardModule,
  ],
  declarations: [RealtimeUsersWidgetComponent],
  exports: [RealtimeUsersWidgetComponent]
})
export class RealtimeUsersWidgetModule {
}
