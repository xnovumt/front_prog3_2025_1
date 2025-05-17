import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ListSeguroComponent } from '../seguro/list/list.component';
import { ManageComponent } from './manage/manage.component';



@NgModule({
  declarations:[
    ListSeguroComponent,
    ManageComponent

  ],
  imports:[CommonModule, FormsModule, RepuestoRoutingModuleRoutingModule]
})
export class RepuestoModule {}