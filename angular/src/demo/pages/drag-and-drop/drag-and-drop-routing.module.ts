import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DragAndDropComponent } from './drag-and-drop.component';

const routes: Routes = [
  {
    path: '',
    component: DragAndDropComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DragAndDropRoutingModule {
}
