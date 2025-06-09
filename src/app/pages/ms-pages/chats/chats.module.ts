// src/app/pages/chat/chat.module.ts

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Importar ReactiveFormsModule y FormsModule

import { ListChatComponent } from './list/list.component';
import { ManageComponent } from './manage/manage.component';
import { ChatRoutingModule } from './chats-routing.module';

@NgModule({
  declarations: [
    ListChatComponent,
    ManageComponent
  ],
  imports: [
    CommonModule,
    ChatRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ChatModule { }