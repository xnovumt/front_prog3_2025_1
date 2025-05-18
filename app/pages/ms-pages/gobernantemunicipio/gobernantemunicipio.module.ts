import { NgModule } from '@angular/core';
import { GobernanteMunicipioRoutingModule } from './gobernantemunicipio-routing.module';
import { ListGobernanteMunicipioComponent } from 'src/app/ms-pages/gobernantemunicipio/list/list.component';
import { ManageComponent } from './manage/manage.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ListGobernanteMunicipioComponent,
    ManageComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    GobernanteMunicipioRoutingModule
  ]
})
export class GobernanteMunicipioModule {}