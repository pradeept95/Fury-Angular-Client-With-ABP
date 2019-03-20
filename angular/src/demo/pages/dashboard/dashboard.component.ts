import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ChartData } from "chart.js";
import * as moment from "moment";
import { Observable } from "rxjs/internal/Observable";
import { ReplaySubject } from "rxjs/internal/ReplaySubject";
import { BarChartWidgetOptions } from "@shared/app-shared/components/bar-chart-widget/bar-chart-widget-options.interface";
import { LineChartWidgetOptions } from "@shared/app-shared/components/line-chart-widget/line-chart-widget-options.interface";
import { SalesSummaryWidgetOptions } from "@shared/app-shared/components/sales-summary-widget/sales-summary-widget-options.interface";
import { DonutChartWidgetOptions } from "@shared/app-shared/components/donut-chart-widget/donut-chart-widget-options.interface";
import { AudienceOverviewWidgetOptions } from "@shared/app-shared/components/audience-overview-widget/audience-overview-widget-options.interface";
import {
  RealtimeUsersWidgetData,
  RealtimeUsersWidgetPages
} from "@shared/app-shared/components/realtime-users-widget/realtime-users-widget.interface";
import { RecentSalesWidgetOptions } from "@shared/app-shared/components/recent-sales-widget/recent-sales-widget-options.interface";
import { AdvancedPieChartWidgetOptions } from "@shared/app-shared/components/advanced-pie-chart-widget/advanced-pie-chart-widget-options.interface";
import { DashboardService } from "./dashboard.service";

@Component({
  selector: "fury-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"]
})
export class DashboardComponent implements OnInit {
  salesData$: Observable<ChartData>;
  totalSalesOptions: BarChartWidgetOptions = {
    title: "Total Sales",
    gain: 16.3,
    subTitle: "compared to last month",
    background: "#5C6BC0",
    color: "#FFFFFF"
  };

  visitsData$: Observable<ChartData>;
  totalVisitsOptions: LineChartWidgetOptions = {
    title: "Visits",
    gain: 42.5,
    subTitle: "compared to last month",
    background: "#00BCD4",
    color: "#FFFFFF"
  };

  clicksData$: Observable<ChartData>;
  totalClicksOptions: LineChartWidgetOptions = {
    title: "Total Clicks",
    gain: -6.1,
    subTitle: "compared to last month",
    background: "#66BB6A",
    color: "#FFFFFF"
  };

  conversionsData$: Observable<ChartData>;
  conversionsOptions: LineChartWidgetOptions = {
    title: "Conversions",
    gain: 10.4,
    subTitle: "compared to last month",
    background: "#009688",
    color: "#FFFFFF"
  };

  salesSummaryData$: Observable<ChartData>;
  salesSummaryOptions: SalesSummaryWidgetOptions = {
    title: "Sales Summary",
    subTitle: "Compare Sales by Time",
    gain: 37.2
  };

  top5CategoriesData$: Observable<ChartData>;
  top5CategoriesOptions: DonutChartWidgetOptions = {
    title: "Top Categories",
    subTitle: "Compare Sales by Category"
  };

  audienceOverviewOptions: AudienceOverviewWidgetOptions[] = [];

  private _realtimeUsersDataSubject = new ReplaySubject<
    RealtimeUsersWidgetData
  >(30);
  realtimeUsersData$: Observable<
    RealtimeUsersWidgetData
  > = this._realtimeUsersDataSubject.asObservable();
  private _realtimeUsersPagesSubject = new ReplaySubject<
    RealtimeUsersWidgetPages[]
  >(1);
  realtimeUsersPages$: Observable<
    RealtimeUsersWidgetPages[]
  > = this._realtimeUsersPagesSubject.asObservable();

  recentSalesData$: Observable<ChartData>;
  recentSalesOptions: RecentSalesWidgetOptions = {
    title: "Recent Sales",
    subTitle: "See who bought what in realtime"
  };
  recentSalesTableOptions = {
    pageSize: 5,
    columns: [
      {
        name: "Product",
        property: "name",
        visible: true,
        isModelProperty: true
      },
      {
        name: "$ Price",
        property: "price",
        visible: true,
        isModelProperty: true
      },
      {
        name: "Time ago",
        property: "timestamp",
        visible: true,
        isModelProperty: true
      }
    ]
  };
  recentSalesTableData$: Observable<any[]>;

  advancedPieChartOptions: AdvancedPieChartWidgetOptions = {
    title: "Sales by country",
    subTitle: "Top 3 countries sold 34% more items this month\n"
  };
  advancedPieChartData$: Observable<ChartData>;

  private static isInitialLoad = true;

  constructor(
    private dashboardService: DashboardService,
    private router: Router
  ) {
    /**
     * Edge wrong drawing fix
     * Navigate anywhere and on Promise right back
     */
    if (/Edge/.test(navigator.userAgent)) {
      if (DashboardComponent.isInitialLoad) {
        this.router.navigate(["/apps/chat"]).then(() => {
          this.router.navigate(["/"]);
        });

        DashboardComponent.isInitialLoad = false;
      }
    }
  }

  /**
   * Needed for the Layout
   */
  private _gap = 16;
  gap = `${this._gap}px`;

  col(colAmount: number) {
    return `1 1 calc(${100 / colAmount}% - ${this._gap -
      this._gap / colAmount}px)`;
  }

  /**
   * Everything implemented here is purely for Demo-Demonstration and can be removed and replaced with your implementation
   */
  ngOnInit() {
    this.salesData$ = this.dashboardService.getSales();
    this.visitsData$ = this.dashboardService.getVisits();
    this.clicksData$ = this.dashboardService.getClicks();
    this.conversionsData$ = this.dashboardService.getConversions();
    this.salesSummaryData$ = this.dashboardService.getSalesSummary();
    this.top5CategoriesData$ = this.dashboardService.getTop5Categories();

    // Audience Overview Widget
    this.dashboardService.getAudienceOverviewUsers().subscribe(response => {
      this.audienceOverviewOptions.push({
        label: "Users",
        data: response
      } as AudienceOverviewWidgetOptions);
    });
    this.dashboardService.getAudienceOverviewSessions().subscribe(response => {
      this.audienceOverviewOptions.push({
        label: "Sessions",
        data: response
      } as AudienceOverviewWidgetOptions);
    });
    this.dashboardService
      .getAudienceOverviewBounceRate()
      .subscribe(response => {
        const property: AudienceOverviewWidgetOptions = {
          label: "Bounce Rate",
          data: response
        };

        // Calculate Bounce Rate Average
        const data = response.datasets[0].data as number[];
        property.sum = `${(
          data.reduce((sum, x) => sum + x) / data.length
        ).toFixed(2)}%`;

        this.audienceOverviewOptions.push(property);
      });

    this.dashboardService
      .getAudienceOverviewSessionDuration()
      .subscribe(response => {
        const property: AudienceOverviewWidgetOptions = {
          label: "Session Duration",
          data: response
        };

        // Calculate Average Session Duration and Format to Human Readable Format
        const data = response.datasets[0].data as number[];
        const averageSeconds = (
          data.reduce((sum, x) => sum + x) / data.length
        ).toFixed(0);
        property.sum = `${averageSeconds} sec`;

        this.audienceOverviewOptions.push(property);
      });

    // Prefill realtimeUsersData with 30 random values
    for (let i = 0; i < 30; i++) {
      this._realtimeUsersDataSubject.next({
        label: moment().fromNow(),
        value: Math.round(Math.random() * (100 - 10) + 10)
      } as RealtimeUsersWidgetData);
    }

    // Simulate incoming values for Realtime Users Widget
    setInterval(() => {
      this._realtimeUsersDataSubject.next({
        label: moment().fromNow(),
        value: Math.round(Math.random() * (100 - 10) + 10)
      } as RealtimeUsersWidgetData);
    }, 5000);

    // Prefill realtimeUsersPages with 3 random values
    const demoPages = [];
    const demoPagesPossibleValues = [
      "/components",
      "/tables/all-in-one-table",
      "/apps/inbox",
      "/apps/chat",
      "/dashboard",
      "/login",
      "/register",
      "/apps/calendar",
      "/forms/form-elements"
    ];
    for (let i = 0; i < 3; i++) {
      const nextPossibleValue =
        demoPagesPossibleValues[
          +Math.round(Math.random() * (demoPagesPossibleValues.length - 1))
        ];
      if (demoPages.indexOf(nextPossibleValue) === -1) {
        demoPages.push(nextPossibleValue);
      }

      this._realtimeUsersPagesSubject.next(
        demoPages.map(pages => {
          return { page: pages } as RealtimeUsersWidgetPages;
        })
      );
    }

    // Simulate incoming values for Realtime Users Widget
    setInterval(() => {
      const nextPossibleValue =
        demoPagesPossibleValues[
          +Math.round(Math.random() * (demoPagesPossibleValues.length - 1))
        ];
      if (demoPages.indexOf(nextPossibleValue) === -1) {
        demoPages.push(nextPossibleValue);
      }

      if (demoPages.length > Math.random() * (5 - 1) + 1) {
        demoPages.splice(Math.round(Math.random() * demoPages.length), 1);
      }

      this._realtimeUsersPagesSubject.next(
        demoPages.map(pages => {
          return { page: pages } as RealtimeUsersWidgetPages;
        })
      );
    }, 5000);

    this.recentSalesTableData$ = this.dashboardService.getRecentSalesTableData();
    this.recentSalesData$ = this.dashboardService.getRecentSalesData();

    this.advancedPieChartData$ = this.dashboardService.getAdvancedPieChartData();
  }
}
