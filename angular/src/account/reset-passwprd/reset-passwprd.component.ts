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
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  templateUrl: "./reset-passwprd.component.html",
  styleUrls: ["./reset-passwprd.component.scss"],
  animations: [accountModuleAnimation()]
})
export class ResetPasswordComponent extends AppComponentBase
  implements AfterContentInit, OnInit {
  @ViewChild("cardBody") cardBody: ElementRef;

  isPasswordChanged: boolean = false;
  passwordDoesnotMatch: boolean = false;
  ErrorMessage: string = "";
  SuccessMessage: string = "";

  model: ResetPasswordDto = new ResetPasswordDto();

  submitting: boolean = false;
  form: FormGroup;

  userKey: string = "";
  token: string = "";

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
    this.route.queryParams.subscribe(params => {
      if (params["userKey"])
        this.userKey = decodeURIComponent(params["userKey"]);
      if (params["token"]) this.token = decodeURIComponent(params["token"]);
    });
  }

  ngOnInit() {
    this.form = this.fb.group(
      {
        userKey: [this.userKey, Validators.required],
        token: [this.token, Validators.required],
        newPassword: ["", Validators.required],
        confirmPassword: ["", Validators.required]
      },

      { validator: this.passwordMatchValidator }
    );
  }

  passwordMatchValidator = (g: FormGroup) => {
    if (g.get("newPassword").value === g.get("confirmPassword").value)
      this.passwordDoesnotMatch = false;
    else this.passwordDoesnotMatch = true;
    return g.get("newPassword").value === g.get("confirmPassword").value
      ? null
      : { mismatch: true };
  };

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

    const resetPasswordModel: ResetPasswordDto = Object.assign(
      {},
      this.model,
      this.form.value
    );

    if (resetPasswordModel.newPassword !== resetPasswordModel.confirmPassword) {
      this.passwordDoesnotMatch = true;
      this.snackbar.open("Password and Confirm Password does not match", "OK", {
        duration: 3000
      });
      return;
    } else {
      this.passwordDoesnotMatch = false;
    }

    if (!this.form.valid) {
      this.snackbar.open("All fields are required.", "OK", {
        duration: 3000
      });
      return;
    }

    this.spinner.show();
    this._accountService
      .resetPasswprd(resetPasswordModel)
      .pipe(
        finalize(() => {
          this.submitting = false;
          this.spinner.hide();
        })
      )
      .subscribe(
        result => {
          this.isPasswordChanged = true;
          this.SuccessMessage = result;
        },
        err => {
          this.isPasswordChanged = false;
          this.SuccessMessage = err;
        }
      );
  };
}
