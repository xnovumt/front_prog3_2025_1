import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { ListPolizaComponent } from './list/list.component';
import { ManageComponent } from './manage/manage.component';



@NgModule({
  declarations: [
    ListPolizaComponent,
    ManageComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
  exports: [RouterModule]
})
export class PolizaModule { }