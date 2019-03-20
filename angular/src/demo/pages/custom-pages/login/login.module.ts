import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { LoginRoutingModule } from "./login-routing.module";
import { LoginComponent } from "./login.component";
import { MaterialModule } from "@shared/app-shared/material-components.module";

@NgModule({
  imports: [
    CommonModule,
    LoginRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  declarations: [LoginComponent]
})
export class LoginModule {}
