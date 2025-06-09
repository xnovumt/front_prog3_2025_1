// src/app/pages/chat/list/list.component.ts

import { Component, OnInit } from '@angular/core';
import { UserConversation } from 'src/app/models/mensaje.model';
import { Usuario } from 'src/app/models/usuario.model';
import { MensajeService } from 'src/app/services/mensajeService/mensaje.service';
import { SeguridadService } from 'src/app/services/seguridadService/seguridadService';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-chat',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListChatComponent implements OnInit {

  userConversations: UserConversation[] = [];
  currentUser: Usuario | null = null;
  currentUserId: string | null = null;
  isLoading: boolean = true;

  constructor(
    private mensajeService: MensajeService,
    private seguridadService: SeguridadService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // Verificar que hay sesión activa
    if (!this.mensajeService.isUserLoggedIn()) {
      console.error('No hay sesión activa.');
      Swal.fire({
        icon: 'error',
        title: 'Error de autenticación',
        text: 'No hay una sesión activa. Por favor, inicie sesión.',
        confirmButtonText: 'Ir a Login'
      }).then(() => {
        this.router.navigate(['/auth/login']);
      });
      return;
    }

    // Obtener el usuario actual
    this.currentUser = this.mensajeService.getCurrentUser();
    this.currentUserId = this.mensajeService.getCurrentUserId();

    console.log('Usuario actual:', this.currentUser);
    console.log('ID del usuario actual:', this.currentUserId);

    if (this.currentUserId) {
      this.loadUserConversations();
    } else {
      console.error('No se pudo obtener el ID del usuario logueado.');
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudo obtener la información del usuario.',
        confirmButtonText: 'Ir a Login'
      }).then(() => {
        this.router.navigate(['/auth/login']);
      });
    }
  }

  loadUserConversations(): void {
    this.isLoading = true;

    this.mensajeService.getUserConversations(this.currentUserId!).subscribe({
      next: (response: any) => {
        console.log('Respuesta del servidor:', response);

        // Manejar diferentes estructuras de respuesta
        if (response && response.data && Array.isArray(response.data)) {
          this.userConversations = response.data;
        } else if (Array.isArray(response)) {
          this.userConversations = response;
        } else {
          console.error('Estructura de respuesta inesperada:', response);
          this.userConversations = [];
        }

        console.log('Conversaciones cargadas:', this.userConversations);
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error al cargar conversaciones:', error);
        this.isLoading = false;

        let errorMessage = 'No se pudieron cargar las conversaciones.';
        if (error.status === 401) {
          errorMessage = 'Su sesión ha expirado. Por favor, inicie sesión nuevamente.';
          // Cerrar sesión automáticamente si hay error 401
          this.seguridadService.logout();
          this.router.navigate(['/auth/login']);
          return;
        }

        Swal.fire('Error', errorMessage, 'error');
      }
    });
  }

  edit(partnerId: string | number) {
    if (typeof partnerId === 'number') {
      partnerId = String(partnerId);
    }

    if (!this.currentUserId) {
      console.error('No se puede iniciar el chat sin el ID del usuario logueado.');
      Swal.fire('Error', 'No se pudo iniciar el chat. ID de usuario no disponible.', 'error');
      return;
    }

    console.log('Navegando al chat entre:', this.currentUserId, 'y', partnerId);

    // Navegar al componente de conversación individual
    this.router.navigate(['/chats/conversation', partnerId]).then(
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

  delete(userId: number | string) {
    Swal.fire({
      title: 'Ocultar conversación',
      text: 'Esta acción solo ocultará la conversación de tu lista local. Los mensajes permanecerán en el servidor.',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, ocultar de mi lista',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        // Filtrar usando _id que es la propiedad correcta de Usuario
        this.userConversations = this.userConversations.filter(
          conversation => conversation._id !== userId && conversation.id !== userId
        );
        Swal.fire('Ocultado!', 'Esta conversación ha sido ocultada de tu lista.', 'success');
      }
    });
  }

  navigateToCreate() {
    this.router.navigate(['/chats/new-conversation']).then(
      success => {
        if (!success) {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se pudo navegar a la búsqueda de usuarios.'
          });
        }
      }
    );
  }

  refreshConversations() {
    if (this.currentUserId) {
      this.loadUserConversations();
    }
  }

  // Método auxiliar para obtener el ID de usuario (ya sea _id o id)
  getUserId(conversation: UserConversation): string {
    return conversation._id || conversation.id || '';
  }

  // Método auxiliar para obtener el nombre del usuario
  getUserName(conversation: UserConversation): string {
    return conversation.nombre || conversation.email || `Usuario ${this.getUserId(conversation)}`;
  }

  formatTimestamp(timestamp: string): string {
    if (!timestamp) return '';
    
    try {
      const date = new Date(timestamp);
      const now = new Date();
      const diffTime = Math.abs(now.getTime() - date.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      if (diffDays === 1) {
        return 'Hoy ' + date.toLocaleTimeString('es-ES', {hour: '2-digit', minute:'2-digit'});
      } else if (diffDays === 2) {
        return 'Ayer ' + date.toLocaleTimeString('es-ES', {hour: '2-digit', minute:'2-digit'});
      } else if (diffDays <= 7) {
        return date.toLocaleDateString('es-ES', {weekday: 'short'}) + ' ' + 
               date.toLocaleTimeString('es-ES', {hour: '2-digit', minute:'2-digit'});
      } else {
        return date.toLocaleDateString('es-ES', {day: '2-digit', month: '2-digit'});
      }
    } catch (error) {
      console.error('Error formateando timestamp:', error);
      return timestamp;
    }
  }
}