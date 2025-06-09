// src/app/pages/chat/manage/manage.component.ts

import { Component, OnInit, OnDestroy, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChatsService } from 'src/app/services/chatService/chats.service';
import { Chat, ChatMessage, SendMessagePayload } from 'src/app/models/chat.model';
// import { AuthService } from 'src/app/services/authService/auth.service'; // Opcional: Importa tu AuthService si lo tienes
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { DateTime } from 'luxon';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit, OnDestroy, AfterViewChecked {
  @ViewChild('scrollMe') private myScrollContainer!: ElementRef;

  mode: number;
  chatPartner: Chat | null = null;

  user1Id: string | null = null;
  user2Id: string | null = null;
  messages: ChatMessage[] = [];

  messageForm!: FormGroup;
  private routeSubscription!: Subscription;
  private messagesPollingInterval: any;

  constructor(
    private activateRoute: ActivatedRoute,
    private chatService: ChatsService,
    private router: Router,
    // private authService: AuthService, // Opcional: Inyecta tu AuthService real
    private fb: FormBuilder
  ) {
    this.mode = 3;
    this.messageForm = this.fb.group({
      contenido: ['', [Validators.required, Validators.maxLength(500)]]
    });
  }

  ngOnInit(): void {
    // --- IMPORTANTE: Obtener el ID del usuario logueado ---
    // Reemplaza esto con la lógica real para obtener el ID del usuario desde tu AuthService.
    // Ejemplo: this.user1Id = this.authService.getLoggedInUserId();
    // Por ahora, para pruebas:
    this.user1Id = 'ID_DEL_USUARIO_LOGUEADO_AQUI'; // <--- ¡CÁMBIAME!

    this.routeSubscription = this.activateRoute.params.subscribe(params => {
      this.user2Id = params['user2Id'];

      if (this.user1Id && this.user2Id) {
        this.loadConversation(this.user1Id, this.user2Id);
        this.loadPartnerDetails(this.user2Id);

        this.messagesPollingInterval = setInterval(() => {
          this.loadConversation(this.user1Id!, this.user2Id!, true);
        }, 5000);
      } else {
        console.error('IDs de usuario incompletos para la conversación.');
        Swal.fire('Error', 'No se pudieron cargar los IDs para la conversación.', 'error');
        this.router.navigate(['/chats/list']);
      }
    });
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  ngOnDestroy(): void {
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
    if (this.messagesPollingInterval) {
      clearInterval(this.messagesPollingInterval);
    }
  }

  loadConversation(u1Id: string, u2Id: string, noScroll: boolean = false): void {
    this.chatService.viewConversation(u1Id, u2Id).subscribe({
      next: (msgs) => {
        const currentMessagesCount = this.messages.length;
        this.messages = msgs;
        if (!noScroll || this.messages.length > currentMessagesCount) {
          this.scrollToBottom();
        }
      },
      error: (error) => {
        console.error('Error al cargar la conversación:', error);
        Swal.fire('Error', 'No se pudo cargar la conversación.', 'error');
      }
    });
  }

  loadPartnerDetails(partnerId: string): void {
    if (this.user1Id) {
      this.chatService.listChatPartners(this.user1Id).subscribe({
        next: (partners) => {
          const partner = partners.find(p => p.id === partnerId);
          if (partner) {
            this.chatPartner = partner;
          } else {
            this.chatPartner = { id: partnerId, name: 'Usuario Desconocido', email: 'N/A' };
          }
        },
        error: (error) => {
          console.error('Error al cargar detalles del partner:', error);
          this.chatPartner = { id: partnerId, name: 'Usuario Desconocido', email: 'N/A' };
        }
      });
    }
  }

  sendMessage(): void {
    if (this.messageForm.valid && this.user1Id && this.user2Id) {
      const payload: SendMessagePayload = {
        contenido: this.messageForm.get('contenido')?.value,
        user_from: this.user1Id,
        user_to: this.user2Id,
        fecha: DateTime.now().toISO()
      };

      this.chatService.sendMessage(payload).subscribe({
        next: (response) => {
          console.log('Mensaje enviado:', response);
          this.messageForm.reset();
          this.loadConversation(this.user1Id!, this.user2Id!);
        },
        error: (error) => {
          console.error('Error al enviar mensaje:', error);
          Swal.fire('Error', 'No se pudo enviar el mensaje.', 'error');
        }
      });
    } else {
      console.log('Formulario inválido o IDs de usuario no definidos. No se puede enviar el mensaje.');
    }
  }

  isMyMessage(message: ChatMessage): boolean {
    return message.user_from === this.user1Id;
  }

  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch(err) {
      // console.warn('Could not scroll to bottom, element not ready yet or no messages:', err);
    }
  }

  back() {
    this.router.navigate(['/chats/list']);
  }

  // --- Métodos de Edición y Eliminación de Mensajes (Opcionales) ---
  // Descomentar y habilitar si los necesitas, y asegúrate de que tu backend los soporte.

  // editMessage(message: ChatMessage) {
  //   Swal.fire({
  //     title: 'Editar Mensaje',
  //     input: 'text',
  //     inputValue: message.contenido,
  //     showCancelButton: true,
  //     confirmButtonText: 'Guardar',
  //     cancelButtonText: 'Cancelar',
  //     inputValidator: (value) => {
  //       if (!value) {
  //         return '¡Necesitas escribir algo!';
  //       }
  //       if (value.length > 500) {
  //         return 'El mensaje no puede exceder los 500 caracteres.';
  //       }
  //       return null;
  //     }
  //   }).then((result) => {
  //     if (result.isConfirmed && result.value && message.id) {
  //       const updatedContent = result.value;
  //       const payload: Partial<SendMessagePayload> = { contenido: updatedContent };
  //       this.chatService.updateMessage(message.id, payload).subscribe({
  //         next: () => {
  //           Swal.fire('Actualizado!', 'Mensaje editado correctamente.', 'success');
  //           this.loadConversation(this.user1Id!, this.user2Id!);
  //         },
  //         error: (error) => {
  //           console.error('Error al editar mensaje:', error);
  //           Swal.fire('Error', 'No se pudo editar el mensaje.', 'error');
  //         }
  //       });
  //     }
  //   });
  // }

  // deleteMessage(messageId: number) {
  //   Swal.fire({
  //     title: 'Eliminar Mensaje',
  //     text: '¿Está seguro que quiere eliminar este mensaje?',
  //     icon: 'warning',
  //     showCancelButton: true,
  //     confirmButtonColor: '#3085d6',
  //     cancelButtonColor: '#d33',
  //     confirmButtonText: 'Sí, eliminar',
  //     cancelButtonText: 'Cancelar'
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       this.chatService.deleteMessage(messageId).subscribe({
  //         next: () => {
  //           Swal.fire('Eliminado!', 'Mensaje eliminado correctamente.', 'success');
  //           this.loadConversation(this.user1Id!, this.user2Id!);
  //         },
  //         error: (error) => {
  //           console.error('Error al eliminar mensaje:', error);
  //           Swal.fire('Error', 'No se pudo eliminar el mensaje.', 'error');
  //         }
  //       });
  //     }
  //   });
  // }
}