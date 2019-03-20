import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FooterComponent } from "./footer.component";
import { MaterialModule } from "@shared/app-shared/material-components.module";

@NgModule({
  imports: [CommonModule, MaterialModule],
  declarations: [FooterComponent],
  exports: [FooterComponent]
})
export class FooterModule {}
