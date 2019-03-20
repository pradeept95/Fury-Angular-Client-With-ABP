import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { AppRouteGuard } from "@shared/auth/auth-route-guard";
import { EmailTemplateComponent } from "./email-template.component";

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: ":mode",
        loadChildren:
          "admin/pages/email-template/email-template-actions/email-template-action.module#EmailTemplateActionModule",
        //data: { permission: "Pages.Users" },
        canActivate: [AppRouteGuard]
      },
      {
        path: "",
        component: EmailTemplateComponent,
        //data: { permission: "Pages.Users" },
        canActivate: [AppRouteGuard]
      }
    ])
  ],
  exports: [RouterModule]
})
export class EmailTemplateRoutingModule {}
