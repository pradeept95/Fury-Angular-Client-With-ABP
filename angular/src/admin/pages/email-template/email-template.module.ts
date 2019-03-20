import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { ListModule } from "@shared/app-shared/list/list.module";
import { EmailTemplateComponent } from "./email-template.component";
import { BreadcrumbsModule } from "admin/core/breadcrumbs/breadcrumbs.module";
import { MaterialModule } from "@shared/app-shared/material-components.module";
import { EmailTemplateRoutingModule } from "./email-template-routing.module";
import { TemplateServiceProxy } from "@shared/service-proxies/service-proxies";

@NgModule({
  declarations: [EmailTemplateComponent],
  imports: [
    CommonModule,
    EmailTemplateRoutingModule,
    FormsModule,
    MaterialModule,
    // Core
    ListModule,
    // CustomerCreateUpdateModule,
    BreadcrumbsModule
  ],
  providers: [TemplateServiceProxy],
  bootstrap: [EmailTemplateComponent]
})
export class EmailTemplateModule {}
