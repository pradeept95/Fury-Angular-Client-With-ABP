import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { BreadcrumbsModule } from "../../core/breadcrumbs/breadcrumbs.module";
import { IconsRoutingModule } from "./icons-routing.module";
import { IconsComponent } from "./icons.component";
import { MaterialModule } from "@shared/app-shared/material-components.module";
import { FuryCardModule } from "@shared/app-shared/card/card.module";

@NgModule({
  imports: [
    CommonModule,
    IconsRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    BreadcrumbsModule,
    FuryCardModule
  ],
  declarations: [IconsComponent]
})
export class IconsModule {}
