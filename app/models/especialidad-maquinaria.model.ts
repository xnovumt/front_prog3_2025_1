import { TipoServicio } from "./tipo-servicio.model";

export class EspecialidadMaquinaria {
    id?: number;
    tipo_servicio_id?: TipoServicio;
    tipo_trabajo?: string;
    creadoEn?: Date;
    actualizadoEn?: Date;
}
