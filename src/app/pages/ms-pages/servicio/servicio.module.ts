import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListServicioComponent } from './list/list.component';
import { ManageComponent } from './manage/manage.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ServicioRoutingModule } from './servicio-routing.module';



@NgModule({
  declarations:[
    ListServicioComponent,
    ManageComponent

  ],
  imports:[CommonModule, FormsModule, ServicioRoutingModule]
})
export class ServicioModule {}