import { Municipio} from "./municipio.model";

export class Obra {
    id?: number;
    nombre?: string;
    paquete_id: number;
    municipio: Municipio;
    creadoEn?: Date;
    actualizadoEn?: Date;
}
