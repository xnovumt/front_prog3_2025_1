import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // ← Agregar esta importación
import { RouterModule } from '@angular/router';

import { ManageComponent } from './manage/manage.component';
import { ListComponent } from './list/list.component';

@NgModule({
  declarations: [
    ManageComponent,
    ListComponent
  ],
  imports: [
    CommonModule,
    FormsModule, // ← Agregar FormsModule aquí
    RouterModule
  ]
})
export class MensajeModule { }