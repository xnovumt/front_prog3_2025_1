import { Poliza } from "./poliza.model";

export class Seguro {
    id?: number;
    name?: string;
    description?: string;
    policies: Poliza[];
    createdAt?: Date;
    updatedAt?: Date;
}
