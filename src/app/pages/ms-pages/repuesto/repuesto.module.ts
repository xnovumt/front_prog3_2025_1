import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ListSeguroComponent } from '../seguro/list/list.component';
import { ManageComponent } from './manage/manage.component';
import { RepuestoRoutingModule } from './repuesto-routing.module';



@NgModule({
  declarations:[
    ListSeguroComponent,
    ManageComponent

  ],
  imports:[CommonModule, FormsModule, RepuestoRoutingModule]
})
export class RepuestoModule {}