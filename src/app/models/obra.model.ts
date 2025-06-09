import { Combo } from "./combo.model";
import { Municipio } from "./municipio.model";

export class Obra {
    id?: number;
    nombre?: string;
    combo_id?: number;
    created_at?: string;
    updated_at?: string;

    // Relaciones opcionales que el backend puede incluir
    combo?: Combo;
    municipios?: Municipio[]; // El backend la incluye automáticamente
}
