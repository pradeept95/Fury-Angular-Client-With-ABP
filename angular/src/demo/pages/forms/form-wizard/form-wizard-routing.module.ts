import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormWizardComponent } from './form-wizard.component';

const routes: Routes = [
  {
    path: '',
    component: FormWizardComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormWizardRoutingModule {
}
