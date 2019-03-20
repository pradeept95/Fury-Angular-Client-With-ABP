import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FuryCardModule } from '../../card/card.module';
import { LoadingOverlayModule } from '../../loading-overlay/loading-overlay.module';
import { MaterialModule } from '../../material-components.module';
import { ScrollbarModule } from '../../scrollbar/scrollbar.module';
import { AdvancedPieChartWidgetComponent } from './advanced-pie-chart-widget.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,

    // Core
    FuryCardModule,
    LoadingOverlayModule,
    ScrollbarModule
  ],
  declarations: [AdvancedPieChartWidgetComponent],
  exports: [AdvancedPieChartWidgetComponent]
})
export class AdvancedPieChartWidgetModule {
}
