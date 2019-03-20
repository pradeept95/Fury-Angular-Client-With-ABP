import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from '../../material-components.module';
import { QuickInfoWidgetComponent } from './quick-info-widget.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule
  ],
  declarations: [QuickInfoWidgetComponent],
  exports: [QuickInfoWidgetComponent]
})
export class QuickInfoWidgetModule {
}
