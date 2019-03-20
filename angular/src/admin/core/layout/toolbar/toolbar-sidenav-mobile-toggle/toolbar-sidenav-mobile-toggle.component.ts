import { Component } from '@angular/core';
import { SidenavState } from '../../sidenav/sidenav-state.enum';
import { SidenavService } from '../../sidenav/sidenav.service';

@Component({
  selector: 'fury-toolbar-sidenav-mobile-toggle',
  templateUrl: './toolbar-sidenav-mobile-toggle.component.html',
  styleUrls: ['./toolbar-sidenav-mobile-toggle.component.scss']
})
export class ToolbarSidenavMobileToggleComponent {

  constructor(private sidenavService: SidenavService) {
  }

  openSidenavMobile() {
    this.sidenavService.sidenavState = SidenavState.MobileOpen;
  }
}
