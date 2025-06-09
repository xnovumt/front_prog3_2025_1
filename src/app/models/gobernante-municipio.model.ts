import { Gobernante } from "./gobernante.model";
import { Municipio } from "./municipio.model";

export class GobernanteMunicipio {
    id?: number;
    gobernante_id?: number;
    municipio_id?: string;
    fecha_inicio?: string;
    fecha_fin?: string;

    // Relaciones (opcionales para cuando se incluyan en las respuestas)
    gobernante?: Gobernante;
    municipio?: Municipio;
}
