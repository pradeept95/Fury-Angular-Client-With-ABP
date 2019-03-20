import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import escape from 'lodash-es/escape';

@Component({
  selector: 'fury-form-elements',
  templateUrl: './form-elements.component.html',
  styleUrls: ['./form-elements.component.scss']
})
export class FormElementsComponent implements OnInit {

  selectCtrl: FormControl = new FormControl();
  showBasicFormSource: boolean;
  basicFormSource = escape(
    `<mat-form-field>
  <input matInput placeholder="Company" type="text" required>
</mat-form-field>

<div fxLayout.gt-sm="row" fxLayoutGap.gt-sm="16px">
  <mat-form-field fxFlex>
    <input matInput placeholder="First Name" type="text">
  </mat-form-field>

  <mat-form-field fxFlex>
    <input matInput placeholder="Last Name" type="text" required>
  </mat-form-field>
</div>

<mat-form-field>
  <input matInput placeholder="Password" type="password" required>
</mat-form-field>

<mat-form-field>
  <input matInput #lengthHint maxlength="10" placeholder="Hint Label and Max Length" type="text" required>
  <mat-hint align="start">Try to type in more than 10 letters</mat-hint>
  <mat-hint align="end">{{ lengthHint.value.length }}/10</mat-hint>
</mat-form-field>

<mat-form-field>
  <input matInput placeholder="Disabled" disabled>
</mat-form-field>
`);
  showAdvancedFormSource: boolean;
  advancedFormSource = escape(
    `<div fxLayout="column" fxLayout.gt-sm="row" fxLayoutGap.gt-sm="16px">
  <mat-form-field color="primary" fxFlex.gt-sm>
    <input matInput placeholder="Primary Color" type="text">
  </mat-form-field>

  <mat-form-field color="accent" fxFlex.gt-sm>
    <input matInput placeholder="Accent Color" type="text">
  </mat-form-field>

  <mat-form-field color="warn" fxFlex.gt-sm>
    <input matInput placeholder="Warn Color" type="text">
  </mat-form-field>
</div>

<mat-form-field>
  <input matInput placeholder="Username" type="text" value="DavidSmith">
  <mat-icon matSuffix>person</mat-icon>
</mat-form-field>

<mat-form-field fxFlex.gt-sm>
  <span matPrefix>+1 &nbsp;</span>
  <input matInput placeholder="Mobile Phone" type="text" required>
  <mat-icon matSuffix>smartphone</mat-icon>
</mat-form-field>

<mat-form-field floatPlaceholder="never">
  <input matInput placeholder="No Floating Placeholder" type="text" required>
</mat-form-field>

<mat-form-field>
  <input matInput [mdDatepicker]="datepickerRef" placeholder="Click on the icon to the right for a Datepicker">
  <button matSuffix [mdDatepickerToggle]="datepickerRef"></button>
</mat-form-field>
<mat-datepicker #datepickerRef></mat-datepicker>
`);
  showFormThemingSource: boolean;
  formThemingSource = escape(
    `<mat-form-field color="primary">
  <input matInput placeholder="Primary Color">
</mat-form-field>

<mat-form-field color="accent">
  <input matInput placeholder="Accent Color">
</mat-form-field>

<mat-form-field color="warn">
  <input matInput placeholder="Warn Color">
</mat-form-field>
`);
  showFormPrefixSuffixSource: boolean;
  formPrefixSuffixSource = escape(
    `<mat-form-field>
  <span matPrefix>+1 &nbsp;</span>
  <input matInput placeholder="Input with prefix text">
</mat-form-field>

<mat-form-field>
  <input matInput placeholder="Input with suffix icon">
  <mat-icon matSuffix>menu</mat-icon>
</mat-form-field>

<mat-form-field>
  <span matPrefix>http:// &nbsp;</span>
  <input matInput placeholder="Input with prefix text and suffix icon">
  <mat-icon matSuffix>camera</mat-icon>
</mat-form-field>
`);
  showFormHintLabelSource: boolean;
  formHintLabelSource = escape(
    `<mat-form-field>
  <input matInput placeholder="Email Address">
  <mat-hint>e.g. david@example.com</mat-hint>
</mat-form-field>

<mat-form-field floatPlaceholder="never">
  <input matInput #hintLabelInputRef placeholder="Domain Name">
  <mat-hint align="end">http://{{ hintLabelInputRef.value || "company" }}.example.com</mat-hint>
</mat-form-field>

<mat-form-field floatPlaceholder="never">
  <input matInput #hintLabelInputLengthRef maxlength="10" placeholder="Dynamic Hint Label">
  <mat-hint align="start">Try to type in more than 10 letters</mat-hint>
  <mat-hint align="end">{{ hintLabelInputLengthRef.value.length }}/10</mat-hint>
</mat-form-field>
</div>
`);
  showFormCheckboxSource: boolean;
  formCheckboxSource = escape(
    `<mat-checkbox [checked]="false">Stay signed in</mat-checkbox>
<mat-checkbox [checked]="true" color="primary">Theming</mat-checkbox>
<mat-checkbox [checked]="false">Simply useful</mat-checkbox>
<mat-checkbox [indeterminate]="true">Indeterminate</mat-checkbox>
<mat-checkbox [checked]="true" align="end">Align end</mat-checkbox>
`);
  showFormCheckboxThemingSource: boolean;
  formCheckboxThemingSource = escape(
    `<mat-checkbox [checked]="true" color="primary">Primary Color</mat-checkbox>
<mat-checkbox [checked]="true" color="accent">Accent Color</mat-checkbox>
<mat-checkbox [checked]="true" color="warn">Warn Color</mat-checkbox>
`);
  selectModel;
  showFormSelectSource: boolean;
  formSelectSource = escape(
    `<mat-select placeholder="Favorite fruit">
  <mat-option value="Apples">Apples</mat-option>
  <mat-option value="Peaches">Peaches</mat-option>
  <mat-option value="Bananas">Bananas</mat-option>
  <mat-option value="Mango">Mango</mat-option>
  <mat-option value="Apples">Cucumber</mat-option>
</mat-select>
`);
  showFormDatepickerSource: boolean;
  formDatepickerSource = escape(
    `<mat-form-field>
  <input matInput [mdDatepicker]="formDatepickerRef" placeholder="Select your date">
  <button matSuffix [mdDatepickerToggle]="formDatepickerRef"></button>
  <mat-hint>Click on the icon to the right for the Datepicker</mat-hint>
</mat-form-field>
<mat-datepicker #formDatepickerRef></mat-datepicker>
`);
  showFormSliderSource: boolean;
  formSliderSource = escape(
    `<mat-slider [min]="0" [max]="100" [step]="1" [thumbLabel]="true" [tickInterval]="10" value="36"></mat-slider>

<div fxLayout="row">
  <mat-slider fxFlex [min]="0" [max]="10" [step]="1" value="6" color="primary"></mat-slider>
  <mat-slider fxFlex [min]="0" [max]="10" [step]="1" value="8" color="accent"></mat-slider>
  <mat-slider fxFlex [min]="0" [max]="10" [step]="1" value="7" color="warn"></mat-slider>
</div>
`);
  showFormRadioSource: boolean;
  formRadioSource = escape(
    `<mat-radio-group fxLayout="row" fxLayoutGap="16px">
  <mat-radio-button value="Apples" [checked]="true">Apples</mat-radio-button>
  <mat-radio-button value="Peaches">Peaches</mat-radio-button>
</mat-radio-group>
<mat-radio-group fxLayout="row" fxLayoutGap="16px" color="accent">
  <mat-radio-button value="primary" [checked]="true" color="primary">Primary Color</mat-radio-button>
  <mat-radio-button value="accent" color="accent">Accent Color</mat-radio-button>
  <mat-radio-button value="warn" color="warn">Warn Color</mat-radio-button>
</mat-radio-group>
`);
  showFormSlideToggleSource: boolean;
  formSlideToggleSource = escape(
    `<div fxLayout="column" fxLayoutGap="8px">
  <mat-slide-toggle [checked]="false">Slide Me</mat-slide-toggle>
  <mat-slide-toggle [checked]="false">Drag & Drop</mat-slide-toggle>
  <mat-slide-toggle [checked]="true">I Agree</mat-slide-toggle>
</div>
<div fxLayout="column" fxLayoutAlign="start end" fxLayoutGap="8px">
  <mat-slide-toggle [checked]="true" color="primary" labelPosition="before">Primary Color</mat-slide-toggle>
  <mat-slide-toggle [checked]="true" color="accent" labelPosition="before">Accent Color</mat-slide-toggle>
  <mat-slide-toggle [checked]="true" color="warn" labelPosition="before">Warn Color</mat-slide-toggle>
</div>
`);
  private _gap = 16;
  gap = `${this._gap}px`;
  col2 = `1 1 calc(50% - ${this._gap / 2}px)`;
  col3 = `1 1 calc(33.3333% - ${this._gap / 1.5}px)`;

  inputType = 'password';
  visible = false;

  constructor(private cd: ChangeDetectorRef) {
  }

  togglePassword() {
    if (this.visible) {
      this.inputType = 'password';
      this.visible = false;
      this.cd.markForCheck();
    } else {
      this.inputType = 'text';
      this.visible = true;
      this.cd.markForCheck();
    }
  }

  ngOnInit() {
  }
}
