import { Departamento } from "./departamento.model";
import { Municipio } from "./municipio.model";

export class Gobernante {
    id?: number;
    user_id?: string;
    start_period?: Date;
    end_period?: Date;
    departamentos?: Departamento[];
    municipalities?: Municipio[];
    createdAt?: Date;
    updatedAt?: Date;
}
