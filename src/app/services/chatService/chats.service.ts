// src/app/services/chatService/chats.service.ts

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { DateTime } from 'luxon';
import { Chat, ChatMessage, SendMessagePayload } from '../../models/chat.model';

@Injectable({
  providedIn: 'root'
})
export class ChatsService { // Mantenemos el nombre original

  constructor(private http: HttpClient) { }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('access_token');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  // Anteriormente 'list()', ahora obtiene los partners de chat (conversaciones)
  listChatPartners(currentUserId: string): Observable<Chat[]> {
    return this.http.get<{ status: string, data: any[] }>(`${environment.url_ms_cinema}/chats/partners/${currentUserId}`, { headers: this.getAuthHeaders() }).pipe(
      map(response => response.data.map(partner => ({
        id: partner.id,
        name: partner.name,
        email: partner.email,
        last_message_content: partner.last_message_content,
        last_message_date: partner.last_message_date ? DateTime.fromISO(partner.last_message_date) : null
      } as Chat)))
    );
  }

  // Anteriormente 'view(id)', ahora obtiene la conversación entre dos usuarios
  viewConversation(user1Id: string, user2Id: string): Observable<ChatMessage[]> {
    return this.http.get<{ status: string, data: any[] }>(`${environment.url_ms_cinema}/chats/conversation/${user1Id}/${user2Id}`, { headers: this.getAuthHeaders() }).pipe(
      map(response => response.data.map(message => ({
        ...message,
        fecha: message.fecha,
        createdAt: message.createdAt,
        updatedAt: message.updatedAt
      } as ChatMessage)))
    );
  }

  // Anteriormente 'create(newChat)', ahora se usa para ENVIAR un nuevo mensaje
  sendMessage(payload: SendMessagePayload): Observable<any> {
    return this.http.post<any>(`${environment.url_ms_cinema}/mensajes`, payload, { headers: this.getAuthHeaders() });
  }

  // Métodos para actualizar y eliminar mensajes individuales (opcionales)
  updateMessage(messageId: number, payload: Partial<SendMessagePayload>): Observable<any> {
    return this.http.put<any>(`${environment.url_ms_cinema}/mensajes/${messageId}`, payload, { headers: this.getAuthHeaders() });
  }

  deleteMessage(messageId: number): Observable<any> {
    return this.http.delete<any>(`${environment.url_ms_cinema}/mensajes/${messageId}`, { headers: this.getAuthHeaders() });
  }
}