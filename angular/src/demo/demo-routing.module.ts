import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { AppRouteGuard } from "@shared/auth/auth-route-guard";
import { RolesComponent } from "app/roles/roles.component";
import { LayoutComponent } from "./core/layout/layout.component";

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: "login",
        loadChildren: "demo/pages/custom-pages/login/login.module#LoginModule"
      },
      {
        path: "register",
        loadChildren:
          "demo/pages/custom-pages/register/register.module#RegisterModule"
      },
      {
        path: "forgot-password",
        loadChildren:
          "demo/pages/custom-pages/forgot-password/forgot-password.module#ForgotPasswordModule"
      },
      {
        path: "",
        component: LayoutComponent,
        data: { permission: "Pages.Users" },
        canActivate: [AppRouteGuard],
        children: [
          {
            path: "home",
            loadChildren:
              "demo/pages/dashboard/dashboard.module#DashboardModule",
            pathMatch: "full",
            data: { permission: "Pages.Users" },
            canActivate: [AppRouteGuard]
          },
          {
            path: "inbox",
            loadChildren: "demo/pages/apps/inbox/inbox.module#InboxModule"
          },
          {
            path: "calendar",
            loadChildren:
              "demo/pages/apps/calendar/calendar.module#CalendarAppModule"
          },
          {
            path: "chat",
            loadChildren: "demo/pages/apps/chat/chat.module#ChatModule"
          },
          {
            path: "components",
            loadChildren:
              "demo/pages/components/components.module#ComponentsModule"
          },
          {
            path: "forms/form-elements",
            loadChildren:
              "demo/pages/forms/form-elements/form-elements.module#FormElementsModule"
          },
          {
            path: "forms/form-wizard",
            loadChildren:
              "demo/pages/forms/form-wizard/form-wizard.module#FormWizardModule"
          },
          {
            path: "icons",
            loadChildren: "demo/pages/icons/icons.module#IconsModule"
          },
          {
            path: "level1/level2/level3/level4/level5",
            loadChildren: "demo/pages/level5/level5.module#Level5Module"
          },
          {
            path: "maps/google-maps",
            loadChildren:
              "demo/pages/maps/google-maps/google-maps.module#GoogleMapsModule"
          },
          {
            path: "tables/simple-table",
            loadChildren:
              "demo/pages/tables/simple-table/simple-table.module#SimpleTableModule"
          },
          {
            path: "tables/all-in-one-table",
            loadChildren:
              "demo/pages/tables/all-in-one-table/all-in-one-table.module#AllInOneTableModule"
          },
          {
            path: "drag-and-drop",
            loadChildren:
              "demo/pages/drag-and-drop/drag-and-drop.module#DragAndDropModule"
          },
          {
            path: "editor",
            loadChildren: "demo/pages/editor/editor.module#EditorModule"
          }
        ]
      }
    ])
  ],
  exports: [RouterModule]
})
export class DemoRoutingModule {}
