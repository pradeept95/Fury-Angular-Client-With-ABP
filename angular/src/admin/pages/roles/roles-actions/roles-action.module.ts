import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BreadcrumbsModule } from "admin/core/breadcrumbs/breadcrumbs.module";
import { MaterialModule } from "@shared/app-shared/material-components.module";
import { RoleActionRoutingModule } from "./roles-action-routing.module";
import { RoleActionComponent } from "./roles-action.component";
import { NgxSpinnerModule } from "ngx-spinner";
import { HighlightModule } from "@shared/app-shared/highlightjs/highlight.module";
import { FuryCardModule } from "@shared/app-shared/card/card.module";
import { TreeviewModule } from "ngx-treeview";

@NgModule({
  declarations: [RoleActionComponent],
  imports: [
    CommonModule,
    RoleActionRoutingModule,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule,
    // Core
    HighlightModule,
    FuryCardModule,
    BreadcrumbsModule,
    NgxSpinnerModule,
    TreeviewModule.forRoot()
  ],
  providers: [],
  bootstrap: [RoleActionComponent]
})
export class RoleActionModule {}
