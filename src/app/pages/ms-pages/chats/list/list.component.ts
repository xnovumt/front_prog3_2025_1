// src/app/pages/chat/list/list.component.ts

import { Component, OnInit } from '@angular/core';
import { Chat } from 'src/app/models/chat.model';
import { ChatsService } from 'src/app/services/chatService/chats.service'; // Usamos el servicio renombrado
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
// import { AuthService } from 'src/app/services/authService/auth.service'; // Opcional: Importa tu AuthService

@Component({
  selector: 'app-list-chat',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListChatComponent implements OnInit {

  chats: Chat[] = []; // Ahora 'chats' contiene los ChatPartner (tipo Chat)
  currentUserId: string | null = null; // Para almacenar el ID del usuario logueado

  constructor(
    private chatsService: ChatsService, // Inyecta el ChatsService renombrado
    private router: Router,
    // private authService: AuthService // Opcional: Inyecta tu AuthService real
  ) { }

  ngOnInit(): void {
    // --- IMPORTANTE: Obtener el ID del usuario logueado ---
    // Reemplaza esto con la lógica real para obtener el ID del usuario desde tu AuthService.
    // Ejemplo: this.currentUserId = this.authService.getLoggedInUserId();
    // Por ahora, para pruebas:
    this.currentUserId = 'ID_DEL_USUARIO_LOGUEADO_AQUI'; // <--- ¡CÁMBIAME!

    if (this.currentUserId) {
      this.loadChatPartners(this.currentUserId);
    } else {
      console.error('No se pudo obtener el ID del usuario logueado. Asegúrate de implementar AuthService.getLoggedInUserId() correctamente.');
      // Opcional: Redirigir a la página de login si no hay usuario logueado
      // this.router.navigate(['/login']);
    }
  }

  loadChatPartners(userId: string): void {
    this.chatsService.listChatPartners(userId).subscribe({
      next: (partners) => {
        this.chats = partners;
        console.log('Chat Partners cargados:', this.chats);
      },
      error: (error) => {
        console.error('Error al cargar partners de chat:', error);
        Swal.fire('Error', 'No se pudieron cargar los chats.', 'error');
      }
    });
  }

  edit(partnerId: string | number) { // El ID del partner es string
    if (typeof partnerId === 'number') {
      partnerId = String(partnerId);
    }

    if (!this.currentUserId) {
      console.error('No se puede iniciar el chat sin el ID del usuario logueado.');
      Swal.fire('Error', 'No se pudo iniciar el chat. ID de usuario no disponible.', 'error');
      return;
    }

    this.router.navigate(['/chats', this.currentUserId, partnerId]).then(
      success => {
        if (!success) {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se pudo navegar a la conversación.'
          });
        }
      },
      error => {
        console.error('Error al navegar a la conversación:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Ocurrió un error al intentar navegar a la conversación.'
        });
      }
    );
  }

  delete(id: number | string) {
    Swal.fire({
      title: 'Eliminar',
      text: '¿La eliminación de un "chat" aquí no elimina la conversación completa del servidor. Solo oculta el compañero de tu lista?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Entendido, eliminar de mi lista',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.chats = this.chats.filter(chat => chat.id !== id);
        Swal.fire('Eliminado de la lista!', 'Este chat ha sido ocultado de tu lista.', 'info');
      }
    });
  }

  navigateToCreate() {
    Swal.fire('Función no implementada', 'Para iniciar un nuevo chat, deberías tener una funcionalidad para buscar usuarios.', 'info');
  }
}