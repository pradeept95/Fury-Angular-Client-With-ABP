import { Component, OnInit, Injector } from "@angular/core";
import { AppComponentBase } from "@shared/app-component-base";
import { AppAuthService } from "@shared/auth/app-auth.service";

@Component({
  selector: "fury-toolbar-user-button",
  templateUrl: "./toolbar-user-button.component.html",
  styleUrls: ["./toolbar-user-button.component.scss"]
})
export class ToolbarUserButtonComponent extends AppComponentBase
  implements OnInit {
  isOpen: boolean;

  constructor(injector: Injector, private _authService: AppAuthService) {
    super(injector);
  }

  ngOnInit() {}

  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }

  onClickOutside() {
    this.isOpen = false;
  }

  logout = (): void => {
    this._authService.logout();
  };
}
