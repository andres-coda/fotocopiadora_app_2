import { ClienteProp } from "../modelo/Entidades/cliente/cliente.interface";
import { filtroLlamada } from "../redux/modelo/reduxContext.interface";
import { FiltroIndividual } from "./filtro.interface";

export const clienteKeyBuscador: (keyof ClienteProp)[] = ['nombre', 'telefono', 'email'];

export const filtrosInicialesCliente: filtroLlamada[] = [
  { id: '', estado: false},
]

export const filtrosClienteFuntion: FiltroIndividual<ClienteProp>[] = [
]