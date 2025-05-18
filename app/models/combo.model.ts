import { Obra } from "./obra.model";

export class Combo {
    id?: number;
    servicio_id?: number;
    obras?: Obra[];
    creadoEn?: Date;
    actualizadoEn?: Date;
}
