import { Usuario } from './usuario.model';

export class Mensaje {
    id?: number;
    contenido?: string; // Para el HTML que usa contenido
    fecha?: string; // Para el HTML que usa fecha
    user_from?: string; // Para el HTML que usa user_from
    user_to?: string; // Para el HTML que usa user_to
    timestamp?: string; // También mantener timestamp para compatibilidad
    from_user_id?: string; // También mantener para API
    to_user_id?: string; // También mantener para API
    content?: string; // También mantener para API
    is_read?: boolean;
}

// Interfaz para conversaciones
export interface UserConversation extends Usuario {
    id?: string; // Agregar id además del _id heredado de Usuario
    last_message_content?: string;
    last_message_timestamp?: string;
    unread_count?: number;
}