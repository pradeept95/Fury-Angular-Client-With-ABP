import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { AppRouteGuard } from "@shared/auth/auth-route-guard";
import { RoleActionComponent } from "./roles-action.component";

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: "",
        component: RoleActionComponent,
        //data: { permission: "Pages.Users" },
        canActivate: [AppRouteGuard]
      }
    ])
  ],
  exports: [RouterModule]
})
export class RoleActionRoutingModule {}
