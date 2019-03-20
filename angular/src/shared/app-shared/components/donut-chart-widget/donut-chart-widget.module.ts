import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FuryCardModule } from '../../card/card.module';
import { FuryChartWidgetModule } from '../../chart-widget/chart-widget.module';
import { LoadingOverlayModule } from '../../loading-overlay/loading-overlay.module';
import { MaterialModule } from '../../material-components.module';
import { DonutChartWidgetComponent } from './donut-chart-widget.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,

    // Core
    FuryCardModule,
    LoadingOverlayModule,

    // Chart Widget Style
    FuryChartWidgetModule
  ],
  declarations: [DonutChartWidgetComponent],
  exports: [DonutChartWidgetComponent]
})
export class DonutChartWidgetModule {
}
