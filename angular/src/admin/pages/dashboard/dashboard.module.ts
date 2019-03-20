import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { DashboardRoutingModule } from "./dashboard-routing.module";
import { DashboardComponent } from "./dashboard.component";
import { DashboardService } from "./dashboard.service";
import { MaterialModule } from "@shared/app-shared/material-components.module";
import { AspectRatioModule } from "@shared/app-shared/aspect-ratio/aspect-ratio.module";
import { BarChartWidgetModule } from "@shared/app-shared/components/bar-chart-widget/bar-chart-widget.module";
import { LineChartWidgetModule } from "@shared/app-shared/components/line-chart-widget/line-chart-widget.module";
import { DonutChartWidgetModule } from "@shared/app-shared/components/donut-chart-widget/donut-chart-widget.module";
import { SalesSummaryWidgetModule } from "@shared/app-shared/components/sales-summary-widget/sales-summary-widget.module";
import { AudienceOverviewWidgetModule } from "@shared/app-shared/components/audience-overview-widget/audience-overview-widget.module";
import { RealtimeUsersWidgetModule } from "@shared/app-shared/components/realtime-users-widget/realtime-users-widget.module";
import { QuickInfoWidgetModule } from "@shared/app-shared/components/quick-info-widget/quick-info-widget.module";
import { RecentSalesWidgetModule } from "@shared/app-shared/components/recent-sales-widget/recent-sales-widget.module";
import { AdvancedPieChartWidgetModule } from "@shared/app-shared/components/advanced-pie-chart-widget/advanced-pie-chart-widget.module";
import { MapsWidgetModule } from "@shared/app-shared/components/maps-widget/maps-widget.module";
import { MarketWidgetModule } from "@shared/app-shared/components/market-widget/market-widget.module";

@NgModule({
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MaterialModule,

    // Core
    AspectRatioModule,

    // Widgets
    BarChartWidgetModule,
    LineChartWidgetModule,
    DonutChartWidgetModule,
    SalesSummaryWidgetModule,
    AudienceOverviewWidgetModule,
    RealtimeUsersWidgetModule,
    QuickInfoWidgetModule,
    RecentSalesWidgetModule,
    AdvancedPieChartWidgetModule,
    MapsWidgetModule,
    MarketWidgetModule
  ],
  declarations: [DashboardComponent],
  providers: [DashboardService]
})
export class DashboardModule {}
