import { Maquina } from "./maquina.model";

export class GPS {
    id?: number;
    latitud?: number; // Updated to match form input type
    longitud?: number; // Updated to match form input type
    maquina_id?: Maquina; // Renamed to match backend
}
