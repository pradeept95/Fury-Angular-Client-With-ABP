import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { AppRouteGuard } from "@shared/auth/auth-route-guard";
import { EmailTemplateActionComponent } from "./email-template-action.component";

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: "",
        component: EmailTemplateActionComponent,
        //data: { permission: "Pages.Users" },
        canActivate: [AppRouteGuard]
      }
    ])
  ],
  exports: [RouterModule]
})
export class EmailTemplateActionRoutingModule {}
