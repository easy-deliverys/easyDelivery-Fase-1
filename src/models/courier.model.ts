import { Orders } from "./orders.model";

export class Courier {
    cedula: number;
    correo: string;
    image: string;
    direccion: string;
    disponible: boolean;
    fechaNacimiento: string;
    genero: string;
    nombre: string;
    realizados: string[];
    realizando: string;
    telefono: number;
    vehiculo: any;
    banned: boolean;
    
    constructor() {
        this.image = "";
        this.realizando = "";
        this.banned = false;
    }
}