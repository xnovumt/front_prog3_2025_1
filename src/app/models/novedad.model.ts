import { Turno } from "./turno.model";

export class Novedad {
    id?: number;
    tipo?: string;
    descripcion?: string;
    evidencia?: string;
    gravedad?: string;
    id_turno?: Turno;
    turno?: Turno;
    createdAt?: Date;
    updatedAt?: Date;
}
