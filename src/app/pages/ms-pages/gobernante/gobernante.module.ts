import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';



@NgModule({
  declarations: [
    ListFacturaComponent,
    ManageComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    FacturaRoutingModule
  ]
})
export class GobernanteModule {}