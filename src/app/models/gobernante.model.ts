import { Departamento } from "./departamento.model";
import { Municipio } from "./municipio.model";

export class Gobernante {
    id?: number;
    id_usuario?: string;
    periodo_inicio?: Date;
    periodo_final?: Date;
    tipo?: 'municipio' | 'departamento';
    territorio?: {
        municipio_id?: string;
        departamento_id?: string;
    };
}
