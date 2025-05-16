import { Turno } from "./turno.model";

export class Novedad {
    id?: number;
    type?: string;
    description?: string;
    evidence?: string;
    gravity?: string;
    turno_id?: Turno;
    turno?: Turno;
    createdAt?: Date;
    updatedAt?: Date;
}
