import { Obra } from "./obra.model";
import { Municipio } from "./municipio.model";

export class ObraMunicipio {
    id?: number;
    obra_id?: number;
    municipio_id?: string; // Mantener como string según tu modelo actual

    // Relaciones opcionales para cuando se incluyan en las respuestas
    obra?: Obra;
    municipio?: Municipio;
}
