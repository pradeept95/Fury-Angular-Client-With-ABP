import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { QuillModule } from "ngx-quill";
import { EditorRoutingModule } from "./editor-routing.module";
import { EditorComponent } from "./editor.component";
import { MaterialModule } from "@shared/app-shared/material-components.module";

@NgModule({
  imports: [CommonModule, EditorRoutingModule, MaterialModule, QuillModule],
  declarations: [EditorComponent]
})
export class EditorModule {}
