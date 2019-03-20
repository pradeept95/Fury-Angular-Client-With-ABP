import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BackdropComponent } from './backdrop.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [BackdropComponent],
  exports: [BackdropComponent]
})
export class BackdropModule {
}
