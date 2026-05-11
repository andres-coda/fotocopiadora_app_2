import { useSelector } from "react-redux";
import { appStore } from "../store";
import { LibroProp } from "../../modelo/Entidades/libro/libro.interface";
import { ClienteProp } from "../../modelo/Entidades/cliente/cliente.interface";
import { EspecificacionProp } from "../../modelo/Entidades/especificacion/especificacion.interface";
import { MateriaProp } from "../../modelo/Entidades/libro/materia.interface";
import { PedidoProp } from "../../modelo/Entidades/pedido/pedido.interface";
import { PedidoLibroProp } from "../../modelo/Entidades/pedido_libro/pedidoLibro.interface";
import { PrecioProp } from "../../modelo/Entidades/precio/precio.interface";
import { SedeProp } from "../../modelo/Entidades/sede/sede.interface";
import { ComponenteProp } from "../../modelo/Entidades/libro/componente.interface";

export const libroItems: LibroProp[]= useSelector((store:appStore)=>store.libro.items);
export const libroSelect: LibroProp | null= useSelector((store:appStore)=>store.libro.selected);

export const ClienteItems: ClienteProp[]= useSelector((store:appStore)=>store.cliente.items);
export const ClienteSelect: ClienteProp | null= useSelector((store:appStore)=>store.cliente.selected);

export const EspecificacionItems: EspecificacionProp[]= useSelector((store:appStore)=>store.especificacion.items);
export const EspecificacionSelect: EspecificacionProp | null= useSelector((store:appStore)=>store.especificacion.selected);

export const MateriaItems: MateriaProp[]= useSelector((store:appStore)=>store.materia.items);
export const MateriaSelect: MateriaProp | null= useSelector((store:appStore)=>store.materia.selected);

export const PedidoItems: PedidoProp[]= useSelector((store:appStore)=>store.pedido.items);
export const PedidoSelect: PedidoProp | null= useSelector((store:appStore)=>store.pedido.selected);

export const PedidoLibroItems: PedidoLibroProp[]= useSelector((store:appStore)=>store.pedidoLibro.items);
export const PedidoLibroSelect: PedidoLibroProp | null= useSelector((store:appStore)=>store.pedidoLibro.selected);

export const PrecioItems: PrecioProp[]= useSelector((store:appStore)=>store.precio.items);
export const PrecioSelect: PrecioProp | null= useSelector((store:appStore)=>store.precio.selected);

export const SedeItems: SedeProp[]= useSelector((store:appStore)=>store.sede.items);
export const SedeSelect: SedeProp | null= useSelector((store:appStore)=>store.sede.selected);

export const ComponenteItems: ComponenteProp[]= useSelector((store:appStore)=>store.componente.items);
export const ComponenteSelect: ComponenteProp | null= useSelector((store:appStore)=>store.componente.selected);