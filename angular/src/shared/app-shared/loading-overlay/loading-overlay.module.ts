import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from '../material-components.module';
import { LoadingOverlayComponent } from './loading-overlay.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule
  ],
  declarations: [LoadingOverlayComponent],
  exports: [LoadingOverlayComponent]
})
export class LoadingOverlayModule {
}
