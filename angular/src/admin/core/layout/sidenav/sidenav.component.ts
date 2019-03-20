import {
  animate,
  state,
  style,
  transition,
  trigger
} from "@angular/animations";
import {
  ChangeDetectorRef,
  Component,
  HostBinding,
  HostListener,
  OnDestroy,
  OnInit,
  Injector
} from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { map, takeUntil } from "rxjs/operators";
import { SidenavState } from "./sidenav-state.enum";
import { SidenavService } from "./sidenav.service";
import { componentDestroyed } from "@shared/app-shared/component-destroyed";
import { of } from "rxjs";
import { AppComponentBase } from "@shared/app-component-base";
import { SideNavItem } from "@shared/layout/menu-item";

@Component({
  selector: "fury-sidenav",
  templateUrl: "./sidenav.component.html",
  styleUrls: ["./sidenav.component.scss"],
  animations: [
    trigger("sidenavState", [
      state(
        SidenavState.Collapsed,
        style({
          position: "absolute",
          width: "74px"
        })
      ),
      state(
        SidenavState.CollapsedHover,
        style({
          position: "absolute",
          width: "270px"
        })
      ),
      state(
        SidenavState.Expanded,
        style({
          position: "relative",
          width: "270px"
        })
      ),
      state(
        SidenavState.Mobile,
        style({
          position: "absolute",
          width: "270px",
          transform: "translate3d(-270px, 0, 0)",
          visibility: "hidden"
        })
      ),
      state(
        SidenavState.MobileOpen,
        style({
          position: "absolute",
          width: "270px",
          transform: "translate3d(0, 0, 0)",
          visibility: "visible"
        })
      ),
      transition(`${SidenavState.Expanded} => ${SidenavState.CollapsedHover}`, [
        style({ position: "absolute" }),
        animate("300ms cubic-bezier(.35, 0, .25, 1)")
      ]),
      transition(`${SidenavState.Expanded} => ${SidenavState.Collapsed}`, [
        style({ position: "absolute" }),
        animate("300ms cubic-bezier(.35, 0, .25, 1)")
      ]),
      transition(
        `${SidenavState.CollapsedHover} => ${SidenavState.Collapsed}`,
        [animate("300ms cubic-bezier(.35, 0, .25, 1)")]
      ),
      transition(
        `${SidenavState.Collapsed} => ${SidenavState.CollapsedHover}`,
        animate("300ms cubic-bezier(.35, 0, .25, 1)")
      ),
      transition(
        `${SidenavState.Mobile} => ${SidenavState.MobileOpen}`,
        animate("300ms cubic-bezier(.35, 0, .25, 1)")
      ),
      transition(
        `${SidenavState.MobileOpen} => ${SidenavState.Mobile}`,
        animate("300ms cubic-bezier(.35, 0, .25, 1)")
      )
    ])
  ]
})
export class SidenavComponent extends AppComponentBase
  implements OnInit, OnDestroy {
  // menu: SideNavItem[];
  menuItems: SideNavItem[] = [
    new SideNavItem(
      this.l("APPS"),
      "",
      "",
      false,
      "",
      1,
      [],
      null,
      "subheading",
      "first-subheading",
      "4",
      "#673ab7",
      false
    ),
    new SideNavItem(
      this.l("Dashboard"),
      "/admin/home",
      "",
      false,
      "dashboard",
      2,
      [],
      null,
      "item",
      "first-subheading",
      "4",
      "#673ab7",
      true
    ),
    new SideNavItem(
      this.l("Templates"),
      "/admin/templates",
      "",
      false,
      "menu",
      3,
      [],
      null,
      "item",
      "first-subheading",
      "",
      "",
      true
    ),
    new SideNavItem(
      this.l("Role"),
      "/admin/roles",
      "",
      false,
      "local_offer",
      3,
      [],
      null,
      "item",
      "first-subheading",
      "",
      "",
      true
    )
  ];

  items$: Observable<SideNavItem[]>;
  sidenavState$: Observable<SidenavState>;

  sidenavState: string;
  isCollapsedState: boolean;

  @HostBinding("class")
  get sidenavClasses() {
    return `sidenav ${this.sidenavState}`;
  }
  isCollapsed: boolean;
  isMobile: boolean;

  constructor(
    private injector: Injector,
    private router: Router,
    private sidenavService: SidenavService,
    private cd: ChangeDetectorRef
  ) {
    super(injector);
    // this.createMenu();
    this.items$ = of(this.menuItems);
  }

  ngOnInit() {
    // this.items$ = this.sidenavService.items$.pipe(
    //   map((items: SidenavItem[]) =>
    //     this.sidenavService.sortRecursive(items, "position")
    //   )

    // this.items$ = of(this.menu);

    this.sidenavState$ = this.sidenavService.sidenavState$;
    this.sidenavService.sidenavState$.subscribe(
      sidenavState => (this.sidenavState = sidenavState)
    );

    this.sidenavService.sidenavState$
      .pipe(takeUntil(componentDestroyed(this)))
      .subscribe(sidenavState => {
        this.isCollapsedState =
          sidenavState === SidenavState.Collapsed ||
          sidenavState === SidenavState.CollapsedHover;
        this.isCollapsed = sidenavState === SidenavState.Collapsed;
        this.cd.markForCheck();
      });
  }

  toggleCollapsed() {
    this.sidenavService.sidenavState =
      this.sidenavService.sidenavState === SidenavState.Expanded
        ? SidenavState.Collapsed
        : SidenavState.Expanded;
  }

  @HostListener("mouseenter")
  @HostListener("touchenter")
  onMouseEnter() {
    if (this.isCollapsedState && !this.isMobile) {
      this.sidenavService.sidenavState = SidenavState.CollapsedHover;
    }
  }

  @HostListener("mouseleave")
  @HostListener("touchleave")
  onMouseLeave() {
    if (this.isCollapsedState && !this.isMobile) {
      this.sidenavService.sidenavState = SidenavState.Collapsed;
    }
  }

  ngOnDestroy() {}

  // createMenu = () => {
  //   this.menu.push({
  //     name: "APPS",
  //     position: 5,
  //     type: "subheading",
  //     customClass: "first-subheading"
  //   });

  //   this.menu.push({
  //     name: "Dashboard",
  //     routeOrFunction: "/demo/home",
  //     icon: "dashboard",
  //     position: 10,
  //     pathMatchExact: true,
  //     permissionNames: "Pages.Users"
  //   });

  //   this.menu.push({
  //     name: "Inbox",
  //     routeOrFunction: "/demo/apps/inbox",
  //     icon: "inbox",
  //     position: 15,
  //     badge: "22",
  //     badgeColor: "#673ab7"
  //   });

  //   this.menu.push({
  //     name: "Chat",
  //     routeOrFunction: "/demo/apps/chat",
  //     icon: "chat",
  //     position: 20,
  //     badge: "14",
  //     badgeColor: "#009688"
  //   });

  //   this.menu.push({
  //     name: "Calendar",
  //     routeOrFunction: "/demo/apps/calendar",
  //     icon: "date_range",
  //     position: 25
  //   });

  //   this.menu.push({
  //     name: "All-In-One Table",
  //     routeOrFunction: "/demo/tables/all-in-one-table",
  //     icon: "assignment",
  //     position: 30
  //   });

  //   this.menu.push({
  //     name: "USER INTERFACE",
  //     type: "subheading",
  //     position: 35
  //   });

  //   this.menu.push({
  //     name: "Components",
  //     routeOrFunction: "/demo/components",
  //     icon: "layers",
  //     position: 40
  //   });

  //   const formElements = {
  //     name: "Form Elements",
  //     routeOrFunction: "/demo/forms/form-elements",
  //     position: 10
  //   };

  //   const formWizard = {
  //     name: "Form Wizard",
  //     routeOrFunction: "/demo/forms/form-wizard",
  //     position: 15
  //   };

  //   this.menu.push({
  //     name: "Forms",
  //     icon: "description",
  //     position: 45,
  //     subItems: [formElements, formWizard]
  //   });

  //   const simpleTable = {
  //     name: "Simple Table",
  //     routeOrFunction: "/demo/tables/simple-table",
  //     position: 10
  //   };

  //   const allInOneTable = {
  //     name: "All-In-One Table",
  //     routeOrFunction: "/demo/tables/all-in-one-table",
  //     position: 15
  //   };

  //   this.menu.push({
  //     name: "Tables",
  //     icon: "format_line_spacing",
  //     position: 50,
  //     subItems: [simpleTable, allInOneTable]
  //   });

  //   this.menu.push({
  //     name: "Drag & Drop",
  //     routeOrFunction: "/demo/drag-and-drop",
  //     icon: "mouse",
  //     position: 55
  //   });

  //   this.menu.push({
  //     name: "WYSIWYG Editor",
  //     routeOrFunction: "/demo/editor",
  //     icon: "format_shapes",
  //     position: 60
  //   });

  //   this.menu.push({
  //     name: "PAGES",
  //     type: "subheading",
  //     position: 65
  //   });

  //   const googleMaps = {
  //     name: "Google Maps",
  //     routeOrFunction: "/demo/maps/google-maps",
  //     position: 5
  //   };

  //   this.menu.push({
  //     name: "Maps",
  //     icon: "map",
  //     position: 70,
  //     subItems: [googleMaps],
  //     badge: "3",
  //     badgeColor: "#4CAF50"
  //   });

  //   this.menu.push({
  //     name: "Material Icons",
  //     routeOrFunction: "/demo/icons",
  //     icon: "grade",
  //     position: 75
  //   });

  //   const login = {
  //     name: "Login Page",
  //     routeOrFunction: "/demo/login",
  //     position: 5
  //   };

  //   const register = {
  //     name: "Register Page",
  //     routeOrFunction: "/demo/register",
  //     position: 10
  //   };

  //   const forgotPassword = {
  //     name: "Forgot Password",
  //     routeOrFunction: "/demo/forgot-password",
  //     position: 15
  //   };

  //   this.menu.push({
  //     name: "Custom Pages",
  //     icon: "web",
  //     position: 80,
  //     subItems: [login, register, forgotPassword]
  //   });

  //   const level5 = {
  //     name: "Level 5",
  //     routeOrFunction: "/demo/level1/level2/level3/level4/level5"
  //   };

  //   const level4 = { name: "Level 4", subItems: [level5] };

  //   const level3 = { name: "Level 3", subItems: [level4] };

  //   const level2 = { name: "Level 2", subItems: [level3] };

  //   const level1 = { name: "Level 1", subItems: [level2] };

  //   this.menu.push({
  //     name: "Multi-Level Menu",
  //     icon: "menu",
  //     position: 85,
  //     subItems: [level1]
  //   });

  //   // Send all created Items to SidenavService
  //   // menu.forEach(item => sidenavService.addItem(item));
  // };
}
