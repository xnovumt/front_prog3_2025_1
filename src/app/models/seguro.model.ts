import { Poliza } from "./poliza.model";

export class Seguro {
    id?: number;
    name?: string;
    description?: string;
    poliza: Poliza[];
    createdAt?: Date;
    updatedAt?: Date;
}
