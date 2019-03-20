import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { ForgotPasswordRoutingModule } from "./forgot-password-routing.module";
import { ForgotPasswordComponent } from "./forgot-password.component";
import { MaterialModule } from "@shared/app-shared/material-components.module";

@NgModule({
  imports: [
    CommonModule,
    ForgotPasswordRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  declarations: [ForgotPasswordComponent]
})
export class ForgotPasswordModule {}
