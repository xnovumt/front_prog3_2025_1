import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './list/list.component'; // ← Cambiar de ListMensajeComponent a ListComponent
import { ManageComponent } from './manage/manage.component';

const routes: Routes = [
  {
    path: 'list',
    component: ListComponent // ← Usar ListComponent
  },
  {
    path: 'create',
    component: ManageComponent
  },
  {
    path: 'update/:id',
    component: ManageComponent
  },
  {
    path: 'view/:id',
    component: ManageComponent
  },
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MensajeRoutingModule { }
