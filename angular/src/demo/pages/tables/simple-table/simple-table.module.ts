import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BreadcrumbsModule } from "../../../core/breadcrumbs/breadcrumbs.module";
import { SimpleTableRoutingModule } from "./simple-table-routing.module";
import { SimpleTableComponent } from "./simple-table.component";
import { MaterialModule } from "@shared/app-shared/material-components.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SimpleTableRoutingModule,
    MaterialModule,
    BreadcrumbsModule
  ],
  declarations: [SimpleTableComponent]
})
export class SimpleTableModule {}
