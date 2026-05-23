import { ClienteDtoProp } from "../cliente/dtoCliente.interface";

export interface pedidoDtoProp{
    fechaEntrega:string;
    importeTotal: number;
    sena: number;
    anillados: number;
    archivos: number;
    cliente?: string;
    clienteDatos?: ClienteDtoProp;
    librosPedidos?: string[]
}