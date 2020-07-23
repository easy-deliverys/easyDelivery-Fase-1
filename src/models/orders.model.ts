import { stateOrders } from "~/app/types";
import { Courier } from "./courier.model";

export interface Orders {
    id?: string;
    entrega: any;
    estado: stateOrders;
    recepcion: any;
    solicitante: any;
    encargado: string;
    infoEncargado?: Courier;
}
