import { Directive } from '@angular/core';

@Directive({
  selector: '[furyAspectRatioContent]',
  host: { '[class.fury-aspect-ratio-content-element]': 'true' }
})
export class AspectRatioContentDirective {

  constructor() {
  }

}
