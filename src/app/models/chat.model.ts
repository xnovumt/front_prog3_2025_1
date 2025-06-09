// src/app/models/chat.model.ts

import { DateTime } from 'luxon';

// Tu modelo "Chat" que ahora representará un compañero de chat
export interface Chat {
  id: string; // Este será el _id del usuario de ms-security (antes user_from/user_to)
  name: string; // El "titulo" anterior se convierte en el nombre del compañero
  email: string; // Añadimos el email del compañero (útil para mostrar)
  // tipo?: string; // "tipo" de chat no aplica para 1 a 1, si es para grupos, es otra lógica.
  // creadoEn?: Date; // No es relevante para el compañero de chat, sí para el mensaje.
  // actualizadoEn?: Date; // No es relevante para el compañero de chat, sí para el mensaje.

  // Añadimos propiedades para el último mensaje, similar a ChatPartner
  last_message_content?: string | null;
  last_message_date?: DateTime | null;
  unread_count?: number; // Para una futura implementación de mensajes no leídos
}

// Mensaje sigue siendo igual, representa un mensaje individual en una conversación
export interface ChatMessage {
  id: number;
  contenido: string;
  user_from: string; // ID del emisor (_id de ms-security)
  user_to: string;   // ID del receptor (_id de ms-security)
  fecha: string;     // Fecha del mensaje como string ISO
  createdAt: string; // Fecha de creación en DB como string ISO
  updatedAt: string; // Fecha de actualización en DB como string ISO
}

// Payload para enviar un nuevo mensaje
export interface SendMessagePayload {
  contenido: string;
  user_from: string;
  user_to: string;
  fecha: string; // Formato ISO, e.g., DateTime.now().toISO()
}