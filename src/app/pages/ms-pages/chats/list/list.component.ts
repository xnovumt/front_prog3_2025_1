import { Component, OnInit } from '@angular/core';
import { Chat } from 'src/app/models/chat.model'; // Importa el modelo Chat
import { ChatsService } from 'src/app/services/chatService/chats.service'; // Importa el servicio ChatsService
// import { Router } from '@angular/router'; // Importa Router si necesitas navegación

@Component({
  selector: 'app-list-chat',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListChatComponent implements OnInit {

  chats: Chat[] = []; // Arreglo para almacenar chats, tipado con el modelo Chat

  // Inyecta el servicio ChatsService y Router (si lo necesitas)
  constructor(private chatsService: ChatsService /*, private router: Router*/) { }

  ngOnInit(): void {
    // Llama al servicio para obtener la lista de chats
    this.chatsService.list().subscribe(data => {
      this.chats = data; // Asigna los datos a la propiedad chats
    });
  }

  // Métodos para editar y eliminar (ajusta el tipo de ID según tu modelo Chat)
  edit(id: number) {
    console.log('Editando Chat ID:', id);
    // Implementa navegación, ej: this.router.navigate(['/admin/chats/edit', id]);
  }

  delete(id: number) {
    console.log('Eliminando Chat ID:', id);
    // Implementa la llamada al servicio delete, ej:
    // this.chatsService.delete(id).subscribe(() => {
    //   console.log('Chat eliminado con éxito');
    //   this.ngOnInit(); // Recarga la lista
    // });
  }
}