import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { UserRoutingModule } from './user-routing.module';
import { UserListComponent } from './list/list.component';
import { UserListEditComponent } from './list/edit/edit.component';
import { UserListViewComponent } from './list/view/view.component';

const COMPONENTS = [
  UserListComponent];
const COMPONENTS_NOROUNT = [
  UserListEditComponent,
  UserListViewComponent];

@NgModule({
  imports: [
    SharedModule,
    UserRoutingModule
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_NOROUNT
  ],
  entryComponents: COMPONENTS_NOROUNT
})
export class UserModule { }
