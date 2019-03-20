import { ChangeDetectionStrategy, Component, Directive, ViewEncapsulation } from '@angular/core';

// noinspection TsLint
@Component({
  selector: 'fury-chart-widget',
  templateUrl: './chart-widget.component.html',
  styleUrls: ['./chart-widget.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { 'class': 'fury-chart-widget' }
})
export class FuryChartWidget {
}

// noinspection TsLint
@Component({
  selector: 'fury-chart-widget-header',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { 'class': 'fury-chart-widget-header' },
  template: `
    <div class="fury-chart-widget-header-title-group">
      <ng-content select="fury-chart-widget-header-title"></ng-content>
      <ng-content select="fury-chart-widget-header-sub-title"></ng-content>
    </div>
    <ng-content select="fury-chart-widget-header-actions"></ng-content>
  `
})
export class FuryChartWidgetHeader {
}

// noinspection TsLint
@Directive({
  selector: 'fury-chart-widget-header-title',
  host: { 'class': 'fury-chart-widget-header-title' }
})
export class FuryChartWidgetHeaderTitle {
}

// noinspection TsLint
@Directive({
  selector: 'fury-chart-widget-header-sub-title',
  host: { 'class': 'fury-chart-widget-header-sub-title' }
})
export class FuryChartWidgetHeaderSubTitle {
}

// noinspection TsLint
@Directive({
  selector: 'fury-chart-widget-header-actions',
  host: { 'class': 'fury-chart-widget-header-actions' }
})
export class FuryChartWidgetHeaderActions {
}

// noinspection TsLint
@Component({
  selector: 'fury-chart-widget-content',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { 'class': 'fury-chart-widget-content' },
  template: `
    <ng-content></ng-content>`
})
export class FuryChartWidgetContent {
}
