import { ProcedimientoMantenimiento } from "./procedimiento-mantenimiento.model";

export class Repuesto {
    id?: number;
    name?: string;
    brand?: string;
    description?: string;
    procedures?: ProcedimientoMantenimiento;
    createdAt?: Date;
    updatedAt?: Date;
}
