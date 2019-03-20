import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { BreadcrumbsComponent } from "./breadcrumbs.component";
import { MaterialModule } from "@shared/app-shared/material-components.module";

@NgModule({
  imports: [CommonModule, MaterialModule, RouterModule],
  declarations: [BreadcrumbsComponent],
  exports: [BreadcrumbsComponent]
})
export class BreadcrumbsModule {}
