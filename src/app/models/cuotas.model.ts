import { Factura } from "./factura.model";
import { Servicio } from "./servicio.model";

export class Cuotas {
    id?: number;
    service_id?: number;
    quantity?: number;
    email?: string;
    client_name?: string;
    payment_reference?: string;
    expiration_date?: Date;
    paid?: boolean;
    factura?: Factura
    service?: Servicio;
    createdAt?: Date;
    updatedAt?: Date;
}
