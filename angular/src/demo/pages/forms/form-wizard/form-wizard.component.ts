import { ChangeDetectorRef, Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatSnackBar, MatStepper } from "@angular/material";

@Component({
  selector: "fury-form-wizard",
  templateUrl: "./form-wizard.component.html",
  styleUrls: ["./form-wizard.component.scss"]
})
export class FormWizardComponent implements OnInit {
  @ViewChild("stepper") private registerFormStepper: MatStepper;
  accountFormGroup: FormGroup;
  passwordFormGroup: FormGroup;
  confirmFormGroup: FormGroup;

  verticalAccountFormGroup: FormGroup;
  verticalPasswordFormGroup: FormGroup;
  verticalConfirmFormGroup: FormGroup;

  phonePrefixOptions = ["+1", "+27", "+44", "+49", "+61", "+91"];

  passwordInputType = "password";

  constructor(
    private fb: FormBuilder,
    private cd: ChangeDetectorRef,
    private snackbar: MatSnackBar
  ) {}

  ngOnInit() {
    /**
     * Horizontal Stepper
     * @type {FormGroup}
     */
    this.accountFormGroup = this.fb.group({
      username: [null, Validators.required],
      name: [null, Validators.required],
      email: [null, Validators.required],
      phonePrefix: [this.phonePrefixOptions[3]],
      phone: []
    });

    this.passwordFormGroup = this.fb.group({
      password: [
        null,
        Validators.compose([Validators.required, Validators.minLength(6)])
      ],
      passwordConfirm: [null, Validators.required]
    });

    this.confirmFormGroup = this.fb.group({
      terms: [null, Validators.requiredTrue]
    });

    /**
     * Vertical Stepper
     * @type {FormGroup}
     */
    this.verticalAccountFormGroup = this.fb.group({
      username: [null, Validators.required],
      name: [null, Validators.required],
      email: [null, Validators.required],
      phonePrefix: [this.phonePrefixOptions[3]],
      phone: []
    });

    this.verticalPasswordFormGroup = this.fb.group({
      password: [
        null,
        Validators.compose([Validators.required, Validators.minLength(6)])
      ],
      passwordConfirm: [null, Validators.required]
    });

    this.verticalConfirmFormGroup = this.fb.group({
      terms: [null, Validators.requiredTrue]
    });
  }

  goBack(stepper: MatStepper) {
    return;
    // stepper.previous();
  }
  goForward(stepper: MatStepper) {
    stepper.next();
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
    this.snackbar.open("Hooray! You successfully created your account.", null, {
      duration: 5000
    });
  }
}
