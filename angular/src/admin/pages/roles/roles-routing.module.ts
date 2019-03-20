import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { AppRouteGuard } from "@shared/auth/auth-route-guard";
import { RoleComponent } from "./roles.component";

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: ":mode",
        loadChildren:
          "admin/pages/roles/roles-actions/roles-action.module#RoleActionModule",
        //data: { permission: "Pages.Users" },
        canActivate: [AppRouteGuard]
      },
      {
        path: "",
        component: RoleComponent,
        //data: { permission: "Pages.Users" },
        canActivate: [AppRouteGuard]
      }
    ])
  ],
  exports: [RouterModule]
})
export class RoleRoutingModule {}
