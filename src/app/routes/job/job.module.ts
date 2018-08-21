import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { JobRoutingModule } from './job-routing.module';
import { JobListComponent } from './list/list.component';
import { JobListEditComponent } from './list/edit/edit.component';
import { JobListViewComponent } from './list/view/view.component';
import { JobCategoryComponent } from './category/category.component';
import { JobCategoryEditComponent } from './category/edit/edit.component';
import { JobCategoryViewComponent } from './category/view/view.component';
import { JobApplyComponent } from './apply/apply.component';
import { JobApplyEditComponent } from './apply/edit/edit.component';
import { JobApplyViewComponent } from './apply/view/view.component';

const COMPONENTS = [
  JobListComponent,
  JobCategoryComponent,
  JobApplyComponent];
const COMPONENTS_NOROUNT = [
  JobListEditComponent,
  JobListViewComponent,
  JobCategoryEditComponent,
  JobCategoryViewComponent,
  JobApplyEditComponent,
  JobApplyViewComponent];

@NgModule({
  imports: [
    SharedModule,
    JobRoutingModule
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_NOROUNT
  ],
  entryComponents: COMPONENTS_NOROUNT
})
export class JobModule { }
