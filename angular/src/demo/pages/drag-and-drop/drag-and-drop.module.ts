import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { SortablejsModule } from "angular-sortablejs";
import { DragAndDropRoutingModule } from "./drag-and-drop-routing.module";
import { DragAndDropComponent } from "./drag-and-drop.component";
import { MaterialModule } from "@shared/app-shared/material-components.module";
import { ScrollbarModule } from "@shared/app-shared/scrollbar/scrollbar.module";

@NgModule({
  imports: [
    CommonModule,
    DragAndDropRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    SortablejsModule,
    ScrollbarModule
  ],
  declarations: [DragAndDropComponent]
})
export class DragAndDropModule {}
