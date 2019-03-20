import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { ListModule } from "@shared/app-shared/list/list.module";
import { RoleComponent } from "./roles.component";
import { BreadcrumbsModule } from "admin/core/breadcrumbs/breadcrumbs.module";
import { MaterialModule } from "@shared/app-shared/material-components.module";
import { RoleRoutingModule } from "./roles-routing.module";

@NgModule({
  declarations: [RoleComponent],
  imports: [
    CommonModule,
    RoleRoutingModule,
    FormsModule,
    MaterialModule,
    // Core
    ListModule,
    // CustomerCreateUpdateModule,
    BreadcrumbsModule
  ],
  providers: [],
  bootstrap: [RoleComponent]
})
export class RoleModule {}
