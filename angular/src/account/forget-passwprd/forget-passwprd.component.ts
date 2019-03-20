import {
  Component,
  Injector,
  ElementRef,
  AfterViewInit,
  ViewChild,
  ChangeDetectorRef,
  AfterContentInit,
  OnInit
} from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import {
  AccountServiceProxy,
  ResetPasswordDto
} from "@shared/service-proxies/service-proxies";
import { AppComponentBase } from "@shared/app-component-base";
import { accountModuleAnimation } from "@shared/animations/routerTransition";
import { finalize } from "rxjs/operators";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { MatSnackBar } from "@angular/material";
import { AppConsts } from "@shared/AppConsts";
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  templateUrl: "./forget-passwprd.component.html",
  styleUrls: ["./forget-passwprd.component.scss"],
  animations: [accountModuleAnimation()]
})
export class ForgetPasswordComponent extends AppComponentBase
  implements AfterContentInit, OnInit {
  @ViewChild("cardBody") cardBody: ElementRef;

  isForgetPasswordSubmitted: boolean = false;
  ErrorMessage: string = "";
  SuccessMessage: string = "";

  model: ForgetPasswordDto = new ForgetPasswordDto();
  submitting: boolean = false;
  form: FormGroup;
  returnRepairUrl = "";

  constructor(
    injector: Injector,
    private _accountService: AccountServiceProxy,
    private _router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private cd: ChangeDetectorRef,
    private spinner: NgxSpinnerService
  ) {
    super(injector);
    this.returnRepairUrl = `${AppConsts.appBaseUrl}/account/reset-password`;
  }

  ngOnInit() {
    this.form = this.fb.group({
      emailAddress: ["", Validators.required],
      passwordResetCallbackUrl: [this.returnRepairUrl, Validators.required]
    });
  }

  ngAfterContentInit(): void {
    $(this.cardBody.nativeElement)
      .find("input:first")
      .focus();
  }

  back(): void {
    this._router.navigate(["/account/login"]);
  }

  resetPassword = (): void => {
    this.submitting = true;

    if (!this.form.valid) {
      this.snackbar.open("Valid email is required.", "OK", {
        duration: 3000
      });
      return;
    }

    const resetPasswordModel: ForgetPasswordDto = Object.assign(
      {},
      this.model,
      this.form.value
    );
    this.spinner.show();
    this._accountService
      .forgetPassword(
        resetPasswordModel.emailAddress,
        resetPasswordModel.passwordResetCallbackUrl
      )
      .pipe(
        finalize(() => {
          this.submitting = false;
          this.spinner.hide();
        })
      )
      .subscribe(
        result => {
          this.isForgetPasswordSubmitted = true;
          this.SuccessMessage = result;
        },
        err => {
          this.isForgetPasswordSubmitted = false;
          this.SuccessMessage = err;
        }
      );
  };
}

export class ForgetPasswordDto {
  emailAddress: string;
  passwordResetCallbackUrl: string;
}
