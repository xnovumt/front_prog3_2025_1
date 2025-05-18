import { Novedad } from "./novedad.model";

export class Turno {
    id?: number;
    fecha?: Date;
    id_operador?: number;
    id_maquinaria?: number;
    novedades?: Novedad[];
    creadoEn?: Date;
    actualizadoEn?: Date;
}
