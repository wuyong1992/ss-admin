import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { EnterpriseRoutingModule } from './enterprise-routing.module';
import { EnterpriseListComponent } from './list/list.component';

const COMPONENTS = [
  EnterpriseListComponent];
const COMPONENTS_NOROUNT = [];

@NgModule({
  imports: [
    SharedModule,
    EnterpriseRoutingModule
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_NOROUNT
  ],
  entryComponents: COMPONENTS_NOROUNT
})
export class EnterpriseModule { }
