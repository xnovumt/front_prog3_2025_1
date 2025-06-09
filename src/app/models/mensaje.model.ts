import { Chat } from "./chat.model";

export class Mensaje {
    id?: number;
    contenido?: string;
    fecha?: Date;
    user_from?: string;
    user_to?: string;
}
