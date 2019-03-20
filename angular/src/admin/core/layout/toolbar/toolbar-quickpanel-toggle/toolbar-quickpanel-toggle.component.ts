import { Component, Input } from '@angular/core';
import { MatSidenav } from '@angular/material';

@Component({
  selector: 'fury-toolbar-quickpanel-toggle',
  templateUrl: './toolbar-quickpanel-toggle.component.html',
  styleUrls: ['./toolbar-quickpanel-toggle.component.scss']
})
export class ToolbarQuickpanelToggleComponent {

  @Input() quickpanel: MatSidenav;

  constructor() {
  }

  openQuickpanel() {
    this.quickpanel.open();
  }
}
