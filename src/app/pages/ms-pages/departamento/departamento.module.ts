import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DepartamentoRoutingModule } from './departamento-routing.module';
import { ListDepartamentoComponent } from './list/list.component';

@NgModule({
    declarations: [
        ListDepartamentoComponent
    ],
    imports: [CommonModule, FormsModule, DepartamentoRoutingModule]
})
export class DepartamentoModule { }