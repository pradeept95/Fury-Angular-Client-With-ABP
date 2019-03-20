import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FuryCardModule } from '../../card/card.module';
import { LoadingOverlayModule } from '../../loading-overlay/loading-overlay.module';
import { MaterialModule } from '../../material-components.module';
import { SalesSummaryWidgetComponent } from './sales-summary-widget.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,

    // Core
    LoadingOverlayModule,
    FuryCardModule
  ],
  declarations: [SalesSummaryWidgetComponent],
  exports: [SalesSummaryWidgetComponent]
})
export class SalesSummaryWidgetModule {
}
