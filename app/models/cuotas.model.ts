import { Factura } from "./factura.model";
import { Servicio } from "./servicio.model";

export class Cuotas {
    id?: number;
    id_servicio?: number;
    cantidad?: number;
    email?: string;
    nombre_cliente?: string;
    referencia_pago?: string;
    fecha_expiracion?: Date;
    pago?: boolean;
    factura?: Factura
    servicio?: Servicio;
    createdAt?: Date;
    updatedAt?: Date;
}
