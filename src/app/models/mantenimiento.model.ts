import { Maquina } from "./maquina.model";
import { Procedimiento } from "./procedimiento.model";

export class Mantenimiento {
    id?: number;
    fecha?: Date;
    estado?: string;
    maquinaria_id?: number;
    procedimientos?: Procedimiento[];
    maquinaria?: Maquina;
    creadoEn?: Date;
    actualizadoEn?: Date;
}
