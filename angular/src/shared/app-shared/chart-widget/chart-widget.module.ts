import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from '../material-components.module';
import {
  FuryChartWidget,
  FuryChartWidgetContent,
  FuryChartWidgetHeader,
  FuryChartWidgetHeaderActions,
  FuryChartWidgetHeaderSubTitle,
  FuryChartWidgetHeaderTitle
} from './chart-widget.component';

const chartWidgetComponents = [
  FuryChartWidget,
  FuryChartWidgetHeader,
  FuryChartWidgetHeaderTitle,
  FuryChartWidgetHeaderSubTitle,
  FuryChartWidgetHeaderActions,
  FuryChartWidgetContent
];

@NgModule({
  imports: [
    CommonModule,
    MaterialModule
  ],
  declarations: [...chartWidgetComponents],
  exports: [...chartWidgetComponents]
})
export class FuryChartWidgetModule {
}
