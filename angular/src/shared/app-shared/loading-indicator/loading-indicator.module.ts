import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatProgressBarModule } from '@angular/material';
import { LoadingIndicatorComponent } from './loading-indicator.component';

@NgModule({
  imports: [
    CommonModule,
    MatProgressBarModule
  ],
  declarations: [LoadingIndicatorComponent],
  exports: [LoadingIndicatorComponent],
})
export class LoadingIndicatorModule {
}
