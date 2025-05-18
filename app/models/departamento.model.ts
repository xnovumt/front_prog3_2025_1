import { Municipio } from "./municipio.model";
import { Gobernante } from "./gobernante.model";

export class Departamento {
    id?: number;
    nombre?: string;
    gobernantes?: Gobernante[];
    municipios?: Municipio[];
    creadoEn?: Date;
    actualizadoEn?: Date;
}
