import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { AppRouteGuard } from "@shared/auth/auth-route-guard";
import { RolesComponent } from "app/roles/roles.component";
import { LayoutComponent } from "./core/layout/layout.component";
import { template_service_per } from "@shared/permission-helper/permission-names";

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: "",
        component: LayoutComponent,
        //data: { permission: "Pages.Users" },
       // canActivate: [AppRouteGuard],
        children: [
          {
            path: "home",
            loadChildren:
              "admin/pages/dashboard/dashboard.module#DashboardModule",
            //data: { permission: "Pages.Users" },
           // canActivate: [AppRouteGuard]
          },
          {
            path: "roles",
            loadChildren: "admin/pages/roles/roles.module#RoleModule",
            //data: { permission: template_service_per },
           // canActivate: [AppRouteGuard]
          },
          {
            path: "templates",
            loadChildren:
              "admin/pages/email-template/email-template.module#EmailTemplateModule",
            //data: { permission: template_service_per },
            //canActivate: [AppRouteGuard]
          }
        ]
      }
    ])
  ],
  exports: [RouterModule]
})
export class DemoRoutingModule {}
