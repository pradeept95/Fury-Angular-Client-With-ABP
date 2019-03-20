import {
  Component,
  Injector,
  ElementRef,
  ViewChild,
  ChangeDetectorRef,
  OnInit
} from "@angular/core";
import { Router } from "@angular/router";
import { AppComponentBase } from "@shared/app-component-base";
import { LoginService } from "./login.service";
import { accountModuleAnimation } from "@shared/animations/routerTransition";
import { AbpSessionService } from "@abp/session/abp-session.service";
import { MatSnackBar } from "@angular/material";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthenticateModel } from "@shared/service-proxies/service-proxies";
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
  animations: [accountModuleAnimation()]
})
export class LoginComponent extends AppComponentBase implements OnInit {
  @ViewChild("cardBody") cardBody: ElementRef;

  submitting: boolean = false;
  form: FormGroup;

  inputType = "password";
  visible = false;
  authenticateModel: AuthenticateModel;

  constructor(
    injector: Injector,
    public loginService: LoginService,
    private _router: Router,
    private _sessionService: AbpSessionService,
    private fb: FormBuilder,
    private cd: ChangeDetectorRef,
    private spinner: NgxSpinnerService
  ) {
    super(injector);
  }

  ngOnInit() {
    this.form = this.fb.group({
      userNameOrEmailAddress: ["", Validators.required],
      password: ["", Validators.required],
      rememberme: [false]
    });
  }

  ngAfterContentInit(): void {
    $(this.cardBody.nativeElement)
      .find("input:first")
      .focus();
  }

  get multiTenancySideIsTeanant(): boolean {
    return this._sessionService.tenantId > 0;
  }

  get isSelfRegistrationAllowed(): boolean {
    if (!this._sessionService.tenantId) {
      return false;
    }

    return true;
  }

  login(): void {
    if (!this.form.valid) {
      this.snackbar.open("All fields are required to log in.", "OK", {
        duration: 3000
      });
      return;
    }
    const loginModel: AuthenticateModel = Object.assign(
      {},
      this.authenticateModel,
      this.form.value
    );
    this.spinner.show();
    this.loginService.authenticate(
      loginModel,
      () => ((this.submitting = false), this.spinner.hide())
    );
  }

  toggleVisibility() {
    if (this.visible) {
      this.inputType = "password";
      this.visible = false;
      this.cd.markForCheck();
    } else {
      this.inputType = "text";
      this.visible = true;
      this.cd.markForCheck();
    }
  }
}
