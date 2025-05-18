import { Component, OnInit } from '@angular/core';
import { Chat } from 'src/app/models/chat.model'; // Importa el modelo Chat
import { ChatsService } from 'src/app/services/chatService/chats.service'; // Importa el servicio ChatsService
import Swal from 'sweetalert2';

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
    this.chatsService.list().subscribe(
      data => {
        this.chats = data;
        console.log('Datos recibidos del servicio (subscribe):', data);
      },
      error => {
        console.error('Error en la suscripción del servicio:', error);
      }
    );
  }

  // Métodos para editar y eliminar (ajusta el tipo de ID según tu modelo Chat)
  edit(id: number) {
    if (isNaN(id)) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'El ID proporcionado no es válido.'
      });
      return;
    }

    console.log('Editando Chat ID:', id);
    // Implementa navegación aquí si es necesario
  }

  delete(id: number) {
    if (confirm('¿Estás seguro de que deseas eliminar este chat?')) {
      this.chatsService.delete(id).subscribe(
        () => {
          Swal.fire({
            icon: 'success',
            title: 'Eliminado',
            text: 'El chat ha sido eliminado con éxito.'
          });
          this.chats = this.chats.filter(chat => chat.id !== id);
        },
        error => {
          console.error('Error al eliminar el chat:', error);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Hubo un error al intentar eliminar el chat.'
          });
        }
      );
    }
  }
}