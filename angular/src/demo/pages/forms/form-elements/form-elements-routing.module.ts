import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormElementsComponent } from './form-elements.component';

const routes: Routes = [
  {
    path: '',
    component: FormElementsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormElementsRoutingModule {
}
