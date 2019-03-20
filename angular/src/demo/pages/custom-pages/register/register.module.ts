import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { RegisterRoutingModule } from "./register-routing.module";
import { RegisterComponent } from "./register.component";
import { MaterialModule } from "@shared/app-shared/material-components.module";

@NgModule({
  imports: [
    CommonModule,
    RegisterRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  declarations: [RegisterComponent]
})
export class RegisterModule {}
