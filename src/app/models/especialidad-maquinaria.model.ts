import { TipoServicio } from "./tipo-servicio.model";

export class EspecialidadMaquinaria {
    id?: number;
    tipo_servicio_id?: TipoServicio;
    tipo_trabajo?: string;
    creado_en?: Date;
    actualizado_en?: Date;
}
