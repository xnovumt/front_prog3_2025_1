import { Departamento } from "./departamento.model";
import { Gobernante } from "./gobernante.model";

export class GobernanteDepartamento {
    id?: number;
    fecha_inicio?: string;
    fecha_fin?: string;
    gobernante_id?: number;
    departamento_id?: number;

    // Relaciones (opcionales para cuando se incluyan en las respuestas)
    departamento?: Departamento;
    gobernante?: Gobernante;
}