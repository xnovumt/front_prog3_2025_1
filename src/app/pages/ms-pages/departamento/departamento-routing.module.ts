import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListDepartamentoComponent } from './list/list.component';

const routes: Routes = [
    { path: 'list', component: ListDepartamentoComponent },
    { path: '', redirectTo: 'list', pathMatch: 'full' }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DepartamentoRoutingModule { }