import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { BreadcrumbsModule } from "../../core/breadcrumbs/breadcrumbs.module";
import { Level5RoutingModule } from "./level5-routing.module";
import { Level5Component } from "./level5.component";
import { FuryCardModule } from "@shared/app-shared/card/card.module";

@NgModule({
  imports: [
    CommonModule,
    Level5RoutingModule,
    FuryCardModule,
    BreadcrumbsModule
  ],
  declarations: [Level5Component]
})
export class Level5Module {}
