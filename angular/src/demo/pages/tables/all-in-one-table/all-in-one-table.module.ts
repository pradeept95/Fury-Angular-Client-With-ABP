import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BreadcrumbsModule } from "../../../core/breadcrumbs/breadcrumbs.module";
import { AllInOneTableRoutingModule } from "./all-in-one-table-routing.module";
import { AllInOneTableComponent } from "./all-in-one-table.component";
import { CustomerCreateUpdateModule } from "./customer-create-update/customer-create-update.module";
import { MaterialModule } from "@shared/app-shared/material-components.module";
import { ListModule } from "@shared/app-shared/list/list.module";

@NgModule({
  imports: [
    CommonModule,
    AllInOneTableRoutingModule,
    FormsModule,
    MaterialModule,

    // Core
    ListModule,
    CustomerCreateUpdateModule,
    BreadcrumbsModule
  ],
  declarations: [AllInOneTableComponent],
  exports: [AllInOneTableComponent]
})
export class AllInOneTableModule {}
