import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MunicipioRoutingModule } from './municipio-routing.module';
import { ListMunicipioComponent } from './list/list.component';

@NgModule({
    declarations: [
        ListMunicipioComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MunicipioRoutingModule
    ]
})
export class MunicipioModule { }
