import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { ListObraMunicipioComponent } from './list/list.component';
import { ManageComponent } from './manage/manage.component';
import { ObraMunicipioRoutingModule } from './obramunicipio-routing.module';



@NgModule({
  declarations:[
    ListObraMunicipioComponent,
    ManageComponent

  ],
  imports:[CommonModule, FormsModule, ObraMunicipioRoutingModule, ReactiveFormsModule]
})
export class ObraMunicipioModule {}