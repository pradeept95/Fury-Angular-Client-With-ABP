import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FuryChartWidgetModule } from '../../chart-widget/chart-widget.module';
import { LoadingOverlayModule } from '../../loading-overlay/loading-overlay.module';
import { MaterialModule } from '../../material-components.module';
import { BarChartWidgetComponent } from './bar-chart-widget.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,

    // Core
    LoadingOverlayModule,

    // Chart Widget Style
    FuryChartWidgetModule
  ],
  declarations: [BarChartWidgetComponent],
  exports: [BarChartWidgetComponent]
})
export class BarChartWidgetModule {
}
