import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { SidenavService } from "demo/core/layout/sidenav/sidenav.service";
import { SidenavState } from "demo/core/layout/sidenav/sidenav-state.enum";

@Component({
  selector: "fury-backdrop",
  templateUrl: "./backdrop.component.html",
  styleUrls: ["./backdrop.component.scss"]
})
export class BackdropComponent implements OnInit {
  isMobileOpen$: Observable<boolean>;

  constructor(private sidenavService: SidenavService) {}

  ngOnInit() {
    this.isMobileOpen$ = this.sidenavService.sidenavState$.pipe(
      map(state => state === SidenavState.MobileOpen)
    );
  }

  closeSidenavMobile() {
    this.sidenavService.sidenavState = SidenavState.Mobile;
  }
}
