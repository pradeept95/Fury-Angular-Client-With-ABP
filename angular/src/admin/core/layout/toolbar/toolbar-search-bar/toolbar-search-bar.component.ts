import { Component, OnInit } from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";
import { SidenavService } from "../../sidenav/sidenav.service";
import { SideNavItem } from "@shared/layout/menu-item";

@Component({
  selector: "fury-toolbar-search-bar",
  templateUrl: "./toolbar-search-bar.component.html",
  styleUrls: ["./toolbar-search-bar.component.scss"]
})
export class ToolbarSearchBarComponent implements OnInit {
  input: string;
  focused: boolean;

  recentlyVisited: SideNavItem[] = [];

  constructor(private router: Router, private sidenavService: SidenavService) {}

  ngOnInit() {
    this.setupDemoData();

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const item = this.sidenavService.getItemByRoute(
          event.urlAfterRedirects
        );

        if (item) {
          const index = this.recentlyVisited.indexOf(item);
          if (index > -1) {
            this.recentlyVisited.splice(index, 1);
          }

          this.recentlyVisited.unshift(item);

          if (this.recentlyVisited.length > 5) {
            this.recentlyVisited.pop();
          }
        }
      }
    });
  }

  setupDemoData() {
    const formWizard = this.sidenavService.getItemByRoute("/forms/form-wizard");
    if (formWizard) this.recentlyVisited.push(formWizard);

    const inbox = this.sidenavService.getItemByRoute("/apps/inbox");
    if (inbox) this.recentlyVisited.push(inbox);

    const allInOneTable = this.sidenavService.getItemByRoute(
      "/tables/all-in-one-table"
    );
    if (allInOneTable) this.recentlyVisited.push(allInOneTable);

    const editor = this.sidenavService.getItemByRoute("/editor");
    if (editor) this.recentlyVisited.push(editor);

    const googleMaps = this.sidenavService.getItemByRoute("/maps/google-maps");
    if (googleMaps) this.recentlyVisited.push(googleMaps);
  }

  openDropdown() {
    this.focused = true;
  }

  closeDropdown() {
    this.focused = false;
  }
}
