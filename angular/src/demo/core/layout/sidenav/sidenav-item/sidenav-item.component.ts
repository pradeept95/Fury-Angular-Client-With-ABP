import {
  animate,
  state,
  style,
  transition,
  trigger
} from "@angular/animations";
import { Component, Input, OnInit, Injector } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { SidenavService } from "../sidenav.service";
import { SideNavItem } from "@shared/layout/menu-item";
import { AppComponentBase } from "@shared/app-component-base";

@Component({
  selector: "fury-sidenav-item",
  templateUrl: "./sidenav-item.component.html",
  styleUrls: ["./sidenav-item.component.scss"],
  animations: [
    trigger("dropdownState", [
      state(
        "collapsed",
        style({
          height: 0
        })
      ),
      state(
        "expanded",
        style({
          height: "*"
        })
      ),
      transition(
        "collapsed <=> expanded",
        animate("300ms cubic-bezier(.35, 0, .25, 1)")
      )
    ])
  ]
})
export class SidenavItemComponent extends AppComponentBase implements OnInit {
  @Input("item") item: SideNavItem;
  @Input("level") level: number;

  isCollapsed$: Observable<boolean>;
  dropdownState$: Observable<string>;

  constructor(
    private injector: Injector,
    private sidenavService: SidenavService,
    private router: Router
  ) {
    super(injector);
    this.isCollapsed$ = this.sidenavService.sidenavState$.pipe(
      map(state => state === "collapsed")
    );
    this.dropdownState$ = this.sidenavService.currentlyOpen$.pipe(
      map(currentlyOpen =>
        currentlyOpen.indexOf(this.item) > -1 ? "expanded" : "collapsed"
      )
    );
  }

  get levelClass() {
    return `level-${this.level}`;
  }

  ngOnInit() {}

  isActive() {
    if (
      this.item.routeOrFunction &&
      typeof this.item.routeOrFunction !== "function"
    ) {
      return this.router.isActive(
        this.router.parseUrl(this.item.routeOrFunction),
        this.item.pathMatchExact || false
      );
    } else {
      return false;
    }
  }

  showMenuItem = (menuItem): boolean => {
    if (menuItem == undefined || menuItem == null) {
      return false;
    }
    if (menuItem.permissionNames) {
      return this.isMultipleGranted(
        menuItem.permissionNames,
        menuItem.isAllPermissionRequired
      );
    }
    return true;
  };

  handleClick() {
    if (this.item.subItems && this.item.subItems.length > 0) {
      this.sidenavService.toggleItemOpen(this.item);
    } else if (
      typeof this.item.routeOrFunction === "string" ||
      this.item.routeOrFunction instanceof String
    ) {
      this.router.navigate([this.item.routeOrFunction]);
    } else if (
      typeof this.item.routeOrFunction === "function" ||
      this.item.routeOrFunction instanceof Function
    ) {
      this.item.routeOrFunction();
    } else {
      throw Error(
        "Could not determine what to do, Sidenav-Item has no routeOrFunction set AND does not contain any subItems"
      );
    }
  }
}
