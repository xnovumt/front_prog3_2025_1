import { NumberSymbol } from "@angular/common";
import { Procedimiento } from "./procedimiento.model";
import { Mantenimiento } from "./mantenimiento.model";

export class ProcedimientoMantenimiento {
    id?: number;
    id_procedimiento?: Procedimiento;
    id_mantenimiento?: Mantenimiento;
    estado?: string;
    createdAt?: Date;
    updatedAt?: Date;
    
}
