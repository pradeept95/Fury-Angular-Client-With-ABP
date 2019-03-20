import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Level5Component } from './level5.component';

const routes: Routes = [
  {
    path: '',
    component: Level5Component
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Level5RoutingModule {
}
