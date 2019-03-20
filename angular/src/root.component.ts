import { Component, OnInit, Injector } from "@angular/core";
import { AppComponentBase } from "@shared/app-component-base";
import { Router } from "@angular/router";

@Component({
  selector: "app-root",
  template: `
    <div class="fury-page-load-animation"></div>
    <fury-loading-indicator></fury-loading-indicator>
    <router-outlet></router-outlet>
  `
})
export class RootComponent extends AppComponentBase implements OnInit {
  bestRoute: string = "/";
  constructor(injector: Injector, private _router: Router) {
    super(injector);
  }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    if (this.isMultipleGranted("Pages.Users")) {
      this.bestRoute = "/admin/home";
    } else if (this.isMultipleGranted("User")) {
      this.bestRoute = "/user/home";
    } else {
      this.bestRoute = "/account/login";
    }
    this._router.navigate([this.bestRoute]);
  }
}
