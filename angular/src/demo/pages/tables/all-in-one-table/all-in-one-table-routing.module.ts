import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllInOneTableComponent } from './all-in-one-table.component';

const routes: Routes = [
  {
    path: '',
    component: AllInOneTableComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AllInOneTableRoutingModule {
}
