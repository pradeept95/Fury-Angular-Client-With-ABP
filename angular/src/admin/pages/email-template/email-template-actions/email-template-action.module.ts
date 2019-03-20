import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BreadcrumbsModule } from "admin/core/breadcrumbs/breadcrumbs.module";
import { MaterialModule } from "@shared/app-shared/material-components.module";
import { NgxSpinnerModule } from "ngx-spinner";
import { HighlightModule } from "@shared/app-shared/highlightjs/highlight.module";
import { FuryCardModule } from "@shared/app-shared/card/card.module";
import { EmailTemplateActionComponent } from "./email-template-action.component";
import { EmailTemplateActionRoutingModule } from "./email-template-action-routing.module";
import { QuillModule } from "ngx-quill";

@NgModule({
  declarations: [EmailTemplateActionComponent],
  imports: [
    CommonModule,
    EmailTemplateActionRoutingModule,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule,
    // Core
    HighlightModule,
    FuryCardModule,
    BreadcrumbsModule,
    NgxSpinnerModule,
    QuillModule
  ],
  providers: [],
  bootstrap: [EmailTemplateActionComponent]
})
export class EmailTemplateActionModule {}
