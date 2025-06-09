// src/app/pages/chat/chat-routing.module.ts

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListChatComponent } from './list/list.component';
import { ManageComponent } from './manage/manage.component';
// import { AuthGuard } from 'src/app/guards/auth.guard'; // Ejemplo, si tienes guardias

const routes: Routes = [
  { path: 'list', component: ListChatComponent /*, canActivate: [AuthGuard]*/ },
  // La ruta para la conversación: user1Id es el ID del usuario logueado, user2Id es el partner
  { path: ':user1Id/:user2Id', component: ManageComponent /*, canActivate: [AuthGuard]*/ },
  { path: '', redirectTo: 'list', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChatRoutingModule { }