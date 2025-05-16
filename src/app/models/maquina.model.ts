import { Combo } from "./combo.model";
import { GPS } from "./gps.model";
import { Seguro } from "./seguro.model";
import { Mantenimiento } from "./mantenimiento.model";
import { Operario } from "./operario.model";
import { Especialidad } from "./especialidad.model";

export class Maquina {
    id?: number;
    especialidad?: string;
    brand?: string;
    model?: string;
    status?: string;
    location?: string;
    disponibility?: string;
    assignment_date?: Date;
    retirement_date?: Date;
    operators: Operario[];
    specialities?: Especialidad[];
    combos?: Combo[];
    Mantenimientos: Mantenimiento[];
    seguros: Seguro[];
    createdAt?: Date;
    updatedAt?: Date;

}
