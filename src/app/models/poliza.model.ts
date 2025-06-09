import { Seguro } from "./seguro.model";
import { Maquina } from "./maquina.model";
import { Operario } from "./operario.model";

export class Poliza {
    id?: number;
    maquinaria_id?: number;
    operario_id?: number;
    seguro_id?: number;
    fecha_inicio?: Date;
    fecha_fin?: Date;
    tipo_poliza?: string; // Cambiar de number a string para usar los enums
    
    // Relaciones opcionales para cuando se incluyan en las respuestas
    maquinaria?: Maquina;
    operario?: Operario;
    seguro?: Seguro;
}
