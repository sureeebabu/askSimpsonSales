import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListcustomerPage } from './listcustomer';

@NgModule({
  declarations: [
    ListcustomerPage,
  ],
  imports: [
    IonicPageModule.forChild(ListcustomerPage),
  ],
})
export class ListcustomerPageModule {}
