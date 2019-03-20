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
  RegisterInput,
  RegisterOutput,
  RegisterVerificationDto,
  RegisterVerificationResponseDto,
  ResetPasswordDto,
  UserStatusResponseDto
} from "@shared/service-proxies/service-proxies";
import { AppComponentBase } from "@shared/app-component-base";
import { LoginService } from "../login/login.service";
import { accountModuleAnimation } from "@shared/animations/routerTransition";
import { finalize } from "rxjs/operators";
import { MatStepper, MatSnackBar } from "@angular/material";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"],
  animations: [accountModuleAnimation()]
})
export class RegisterComponent extends AppComponentBase
  implements AfterContentInit, OnInit {
  @ViewChild("cardBody") cardBody: ElementRef;
  @ViewChild("stepper") registerFormStepper: MatStepper;
  accountFormGroup: FormGroup;
  passwordFormGroup: FormGroup;
  confirmFormGroup: FormGroup;

  model: RegisterInput = new RegisterInput();
  globlaErrorMessage: string = "";

  saving: boolean = false;
  passwordInputType = "password";

  registerInput: RegisterInput = new RegisterInput();
  verifyUserInput: RegisterVerificationDto = new RegisterVerificationDto();
  createPasswordInput: ResetPasswordDto = new ResetPasswordDto();

  //auto tab setup extra fields
  currentActiveIndex: number = 0;
  isLinear: boolean = true;

  //for first step -- registration
  isRegistrationCompleted: boolean = false;
  isRegisterEditable: boolean = true;
  isRegisterOptional: boolean = false;

  //for second step -- verify user\
  isVerificationCompleted: boolean = false;
  isVerificationEditable: boolean = true;
  isVerificationOptional: boolean = false;

  //for third step -- create password
  isCreatePasswordCompleted: boolean = false;
  isCreatePasswordEditable: boolean = true;
  isCreatePasswordOptional: boolean = false;

  constructor(
    injector: Injector,
    private _accountService: AccountServiceProxy,
    private _router: Router,
    private readonly _loginService: LoginService,
    private fb: FormBuilder,
    private cd: ChangeDetectorRef,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService
  ) {
    super(injector);
  }

  ngOnInit() {
    /**
     * Horizontal Stepper
     * @type {FormGroup}
     */
    this.accountFormGroup = this.fb.group({
      firstName: [null, Validators.required],
      middleName: [null],
      lastName: [null, Validators.required],
      emailAddress: [null, Validators.required],
      phoneNumber: [null, Validators.required]
      // recaptcha: ["", Validators.required]
    });

    this.confirmFormGroup = this.fb.group({
      userId: ["", Validators.required],
      verificationEmailToken: ["", Validators.required],
      verificationPhoneTokne: ["", Validators.required],
      verificationCode: ["", Validators.required]
    });

    this.passwordFormGroup = this.fb.group({
      userKey: ["", Validators.required],
      token: ["", Validators.required],
      newPassword: ["", [Validators.required, Validators.minLength(6)]],
      confirmPassword: ["", Validators.required]
    });
  }

  prepareFormStep(key) {
    this.spinner.show();
    this._accountService
      .checkUserStatus(key)
      .pipe(
        finalize(() => {
          this.spinner.hide();
        })
      )
      .subscribe((result: UserStatusResponseDto) => {
        if (result.isSuccess) {
          this.isLinear = false;
          if (result.stepNumber == 2) {
            this.prepareStepTwo(result);
          } else if (result.stepNumber == 3) {
            this.prepareStepThree(result);
          }
        } else {
          this.notify.error(result.message);
          this._router.navigate(["/account/login"]);
        }
      });
  }

  prepareStepTwo(result: UserStatusResponseDto) {
    //step 1
    // this.isLinear = false;
    // this.isRegistrationCompleted = true;
    // this.isRegisterEditable = false;
    // this.isRegisterOptional = true;
    this.registerFormStepper.selectedIndex = 2;
    this.confirmFormGroup.patchValue({
      userId: result.userId,
      verificationEmailToken: result.verificationEmailToken,
      verificationPhoneTokne: result.verificationPhoneToken,
      verificationCode: ""
    });
  }

  prepareStepThree(result: UserStatusResponseDto) {
    // this.isLinear = false;
    // //step 1
    // this.isRegistrationCompleted = true;
    // this.isRegisterEditable = false;
    // this.isRegisterOptional = true;

    // //step 2
    // this.isVerificationCompleted = true;
    // this.isVerificationEditable = false;
    // this.isVerificationOptional = true;
    this.registerFormStepper.selectedIndex = 3;
    this.passwordFormGroup.patchValue({
      userKey: result.userKey,
      token: result.token
    });
  }

  ngAfterContentInit(): void {
    $(this.cardBody.nativeElement)
      .find("input:first")
      .focus();

    this.route.queryParams.subscribe(params => {
      if (params["key"]) {
        this.prepareFormStep(decodeURIComponent(params["key"]));
      }
    });
  }

  goToLogin() {
    this._router.navigate(["/account/login"]);
  }

  registerUser(stepper: MatStepper) {
    this.saving = true;
    if (!this.accountFormGroup.valid) {
      this.snackbar.open("All fields are required.", "OK", {
        duration: 3000
      });
      return;
    }
    const registerModel: RegisterInput = Object.assign(
      {},
      this.registerInput,
      this.accountFormGroup.value
    );
    this.spinner.show();
    this._accountService
      .register(registerModel)
      .pipe(
        finalize(() => {
          this.saving = false;
          this.spinner.hide();
        })
      )
      .subscribe((result: RegisterOutput) => {
        if (result.isSuccess) {
          //step 1
          this.isRegistrationCompleted = true;
          this.isRegisterEditable = false;
          this.isRegisterOptional = true;

          this.notify.success(result.registerMessage);
          this.confirmFormGroup.patchValue({
            userId: result.userId,
            verificationEmailToken: result.verificationEmailToken,
            verificationPhoneTokne: result.verificationPhoneTokne,
            verificationCode: ""
          });
          this.model.userName = registerModel.phoneNumber;
          stepper.next();
        } else {
          this.notify.error(result.registerMessage);
          this.globlaErrorMessage = result.registerMessage;
          setTimeout(() => {
            this.globlaErrorMessage = "";
          }, 6000);
        }
      });
  }

  resetVerifyUser() {
    this.confirmFormGroup.patchValue({
      verificationCode: ""
    });
  }

  verifyUser(stepper: MatStepper) {
    this.saving = true;
    if (!this.confirmFormGroup.valid) {
      this.snackbar.open("All fields are required.", "OK", {
        duration: 3000
      });
      return;
    }
    const verifyModel: RegisterVerificationDto = Object.assign(
      {},
      this.registerInput,
      this.confirmFormGroup.value
    );
    this.spinner.show();
    this._accountService
      .verifyUser(verifyModel)
      .pipe(
        finalize(() => {
          this.saving = false;
          this.spinner.hide();
        })
      )
      .subscribe((result: RegisterVerificationResponseDto) => {
        if (result.isVerificationSuccess) {
          //step 2
          this.isVerificationCompleted = true;
          this.isVerificationEditable = false;
          this.isVerificationOptional = true;

          this.notify.success(result.verificationMessage);
          this.passwordFormGroup.patchValue({
            userKey: result.userKey,
            token: result.token
          });
          stepper.next();
        } else {
          this.notify.error(result.verificationMessage);
        }
      });
  }

  resetCreatePassword() {
    this.passwordFormGroup.patchValue({
      newPassword: "",
      confirmPassword: ""
    });
  }

  registerPassword(stepper: MatStepper) {
    this.saving = true;
    if (!this.passwordFormGroup.valid) {
      this.snackbar.open("All fields are required.", "OK", {
        duration: 3000
      });
      return;
    }
    const createPasswordModel: ResetPasswordDto = Object.assign(
      {},
      this.createPasswordInput,
      this.passwordFormGroup.value
    );
    this.spinner.show();
    this._accountService
      .verificationUserResetPasswprd(createPasswordModel)
      .pipe(
        finalize(() => {
          this.saving = false;
          this.spinner.hide();
        })
      )
      .subscribe((result: RegisterOutput) => {
        if (result.canLogin) {
          // this.notify.success(result.registerMessage);
          this.model.password = createPasswordModel.newPassword;
          this.submit();
        } else {
          this.notify.error(result.registerMessage);
        }
      });
  }

  showPassword() {
    this.passwordInputType = "text";
    this.cd.markForCheck();
  }

  hidePassword() {
    this.passwordInputType = "password";
    this.cd.markForCheck();
  }

  submit() {
    this.snackbar.open("successfully created your account.", null, {
      duration: 5000
    });

    this.notify.success("Your are logging in...");

    //Autheticate
    this.saving = true;
    this._loginService.authenticateModel.userNameOrEmailAddress = this.model.userName;
    this._loginService.authenticateModel.password = this.model.password;
    this.spinner.show();
    this._loginService.authenticate(
      this._loginService.authenticateModel,
      () => {
        this.saving = false;
        this.spinner.hide();
      }
    );
  }
}
