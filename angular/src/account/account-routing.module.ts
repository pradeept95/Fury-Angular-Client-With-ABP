import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { AccountComponent } from "./account.component";
import { ResetPasswordComponent } from "./reset-passwprd/reset-passwprd.component";
import { ForgetPasswordComponent } from "./forget-passwprd/forget-passwprd.component";

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: "",
        component: AccountComponent,
        children: [
          { path: "login", component: LoginComponent },
          { path: "register", component: RegisterComponent },
          { path: "reset-password", component: ResetPasswordComponent },
          {
            path: "forgot-password",
            component: ForgetPasswordComponent
          }
        ]
      }
    ])
  ],
  exports: [RouterModule]
})
export class AccountRoutingModule {}
