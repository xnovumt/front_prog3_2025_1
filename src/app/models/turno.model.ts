import { Novedad } from "./novedad.model";

export class Turno {
    id?: number;
    date?: Date;
    operator_id?: number;
    machinery_id?: number;
    novelties?: Novedad[];
    createdAt?: Date;
    updatedAt?: Date;
}
