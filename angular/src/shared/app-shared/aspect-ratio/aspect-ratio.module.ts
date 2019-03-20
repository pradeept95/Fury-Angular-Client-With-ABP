import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AspectRatioContentDirective } from './aspect-ratio-content.directive';
import { AspectRatioDirective } from './aspect-ratio.directive';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule
  ],
  declarations: [AspectRatioDirective, AspectRatioContentDirective],
  exports: [AspectRatioDirective, AspectRatioContentDirective]
})
export class AspectRatioModule {
}
