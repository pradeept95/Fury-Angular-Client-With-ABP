import { AgmCoreModule } from '@agm/core';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MapsWidgetComponent } from './maps-widget.component';

@NgModule({
  imports: [
    CommonModule,
    AgmCoreModule
  ],
  declarations: [MapsWidgetComponent],
  exports: [MapsWidgetComponent]
})
export class MapsWidgetModule {
}
