import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EnterpriseListComponent } from './list/list.component';

const routes: Routes = [
  {path: '', redirectTo: 'list', pathMatch: 'full'},
  { path: 'list', component: EnterpriseListComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EnterpriseRoutingModule { }
