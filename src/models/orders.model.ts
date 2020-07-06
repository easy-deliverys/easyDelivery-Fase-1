import { stateOrders } from "~/app/types";

export interface Orders {
    id?: string;
    entrega: any;
    estado: stateOrders;
    recepcion: any;
    solicitante: any;
    encargado: string;
}
