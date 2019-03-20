import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { BreadcrumbsModule } from "../../../core/breadcrumbs/breadcrumbs.module";
import { FormElementsRoutingModule } from "./form-elements-routing.module";
import { FormElementsComponent } from "./form-elements.component";
import { MaterialModule } from "@shared/app-shared/material-components.module";
import { HighlightModule } from "@shared/app-shared/highlightjs/highlight.module";
import { FuryCardModule } from "@shared/app-shared/card/card.module";

@NgModule({
  imports: [
    CommonModule,
    FormElementsRoutingModule,
    MaterialModule,
    ReactiveFormsModule,

    // Core
    HighlightModule,
    FuryCardModule,
    BreadcrumbsModule
  ],
  declarations: [FormElementsComponent]
})
export class FormElementsModule {}
