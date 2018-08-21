import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {JobListComponent} from './list/list.component';
import {JobCategoryComponent} from './category/category.component';
import { JobApplyComponent } from './apply/apply.component';

const routes: Routes = [
  {path: '', redirectTo: 'list', pathMatch: 'full'},
  {path: 'list', component: JobListComponent},
  {path: 'category', component: JobCategoryComponent},
  { path: 'apply', component: JobApplyComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JobRoutingModule {
}
