import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FuryCardModule } from '../../card/card.module';
import { ListModule } from '../../list/list.module';
import { LoadingOverlayModule } from '../../loading-overlay/loading-overlay.module';
import { MaterialModule } from '../../material-components.module';
import { RecentSalesWidgetTableComponent } from './recent-sales-widget-table/recent-sales-widget-table.component';
import { RecentSalesWidgetComponent } from './recent-sales-widget.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,

    // Core
    LoadingOverlayModule,
    FuryCardModule,
    ListModule
  ],
  declarations: [RecentSalesWidgetComponent, RecentSalesWidgetTableComponent],
  exports: [RecentSalesWidgetComponent]
})
export class RecentSalesWidgetModule {
}
