import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComboComponent } from './list/list.component';
import { ManageComponent } from './manage/manage.component';



@NgModule({
  imports: [RouterModule],
  exports: [RouterModule]
})
export class CombosModule {}