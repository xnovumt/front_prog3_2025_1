import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListMunicipioComponent } from './list/list.component';


const routes: Routes = [
    { path: 'list', component: ListMunicipioComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MunicipioRoutingModule { }
