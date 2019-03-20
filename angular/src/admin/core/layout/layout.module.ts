import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { FooterModule } from "./footer/footer.module";
import { LayoutComponent } from "./layout.component";
import { QuickpanelModule } from "./quickpanel/quickpanel.module";
import { SidenavModule } from "./sidenav/sidenav.module";
import { ToolbarModule } from "./toolbar/toolbar.module";
import { MaterialModule } from "@shared/app-shared/material-components.module";
import { LoadingIndicatorModule } from "@shared/app-shared/loading-indicator/loading-indicator.module";
import { MediaQueryService } from "@shared/app-shared/mediareplay/media-replay.service";
import { BackdropModule } from "./backdrop/backdrop.module";

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    LoadingIndicatorModule,

    // Core
    ToolbarModule,
    QuickpanelModule,
    SidenavModule,
    FooterModule,
    BackdropModule
  ],
  declarations: [LayoutComponent],
  providers: [MediaQueryService]
})
export class LayoutModule {}
