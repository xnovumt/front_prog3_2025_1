import { Chat } from "./chat.model";

export class Mensaje {
    id?: number;
    content?: string;
    date?: string;
    chat_id?: number;
    user_id?: number;
    chat?: Chat;
    createdAt?: Date;
    updatedAt?: Date;
    
}
