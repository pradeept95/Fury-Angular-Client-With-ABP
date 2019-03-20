import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
  { path: "", redirectTo: "/admin/home", pathMatch: "full" },
  {
    path: "account",
    loadChildren: "account/account.module#AccountModule", //Lazy load account module
    data: { preload: true }
  },
  {
    path: "app",
    loadChildren: "app/app.module#AppModule", //Lazy load app module
    data: { preload: true }
  },
  {
    path: "admin",
    loadChildren: "admin/admin.module#AdminModule", //Lazy load admin module
    data: { preload: true }
  },
  {
    path: "demo",
    loadChildren: "demo/demo.module#DemoModule", //Lazy load demo module
    data: { preload: true }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class RootRoutingModule {}
