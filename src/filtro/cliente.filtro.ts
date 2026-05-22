import { CampoBusqueda } from "../modelo/Entidades/base/base.interface";
import { ClienteAdapterProp, ClienteProp } from "../modelo/Entidades/cliente/cliente.interface";
import { filtroLlamada } from "../redux/modelo/reduxContext.interface";
import { FiltroIndividual } from "./filtro.interface";

export const clienteKeyBuscador: (keyof ClienteProp)[] = ['nombre', 'telefono', 'email'];

export const filtrosInicialesCliente: filtroLlamada[] = [
  { id: '', estado: false},
]

export const filtrosClienteFuntion: FiltroIndividual<ClienteProp>[] = [
]

export const camposBusquedaCliente:CampoBusqueda<ClienteAdapterProp>[] = [
  c => c.nombre ?? '',
  c => c.email ?? '',
  c => c.telefono ?? ''
]