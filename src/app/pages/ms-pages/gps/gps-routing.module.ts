import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListGpsComponent } from './list/list.component';
import { ManageComponent } from './manage/manage.component';
import { MapaGpsComponent } from './mapa-gps/mapa-gps.component';
import { GpsLocationViewComponent } from './gps-location-view/gps-location-view.component';

const routes: Routes = [
  { path: 'list', component: ListGpsComponent },
  { path: 'create', component: ManageComponent },
  { path: 'update/:id', component: ManageComponent },
  { path: 'view/:id', component: ManageComponent },
  { path: 'map/:id', component: MapaGpsComponent },
  { path: 'gps-view/:id', component: GpsLocationViewComponent },

];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GpsRoutingModule { }
