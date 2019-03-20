import { Component } from '@angular/core';
import * as screenfull from 'screenfull';

@Component({
  selector: 'fury-toolbar-fullscreen-toggle',
  templateUrl: './toolbar-fullscreen-toggle.component.html',
  styleUrls: ['./toolbar-fullscreen-toggle.component.scss']
})
export class ToolbarFullscreenToggleComponent {

  isFullscreen: boolean;

  constructor() {
  }

  toggleFullscreen() {
    if (screenfull.enabled) {
      screenfull.toggle();
      this.isFullscreen = !this.isFullscreen;
    }
  }
}
