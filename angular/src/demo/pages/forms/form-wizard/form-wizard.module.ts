import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { FormWizardRoutingModule } from "./form-wizard-routing.module";
import { FormWizardComponent } from "./form-wizard.component";
import { MaterialModule } from "@shared/app-shared/material-components.module";

@NgModule({
  imports: [
    CommonModule,
    FormWizardRoutingModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  declarations: [FormWizardComponent]
})
export class FormWizardModule {}
