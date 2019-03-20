import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  FuryCard,
  FuryCardActions,
  FuryCardContent,
  FuryCardHeader,
  FuryCardHeaderActions,
  FuryCardHeaderSubTitle,
  FuryCardHeaderTitle
} from './card.component';

const cardComponents = [
  FuryCard,
  FuryCardHeader,
  FuryCardHeaderTitle,
  FuryCardHeaderSubTitle,
  FuryCardHeaderActions,
  FuryCardContent,
  FuryCardActions
];

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ...cardComponents
  ],
  exports: [
    ...cardComponents
  ]
})
export class FuryCardModule {
}
