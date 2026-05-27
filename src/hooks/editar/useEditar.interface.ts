import { Dispatch, SetStateAction } from "react";
import { ClienteProp } from "../../modelo/Entidades/cliente/cliente.interface";
import { LibroProp } from "../../modelo/Entidades/libro/libro.interface";
import { PedidoProp } from "../../modelo/Entidades/pedido/pedido.interface";
import { SedeProp } from "../../modelo/Entidades/sede/sede.interface";
import { PrecioProp } from "../../modelo/Entidades/precio/precio.interface";
import { PropuestaProp } from "../../modelo/Entidades/propuesta/propuesta.interface";

export interface PropEditar {
  cliente?: ClienteProp;
  libro?: LibroProp;
  pedido?: PedidoProp;
  sede?: SedeProp;
  precio?: PrecioProp;
  propuesta?: PropuestaProp;
}

export interface PropEditarCompleto extends PropEditar {
  ruta?: string;
  setModalLocal?: Dispatch<SetStateAction<boolean>>;
}

export interface HandleSelectProp extends PropEditar {
  rutaLocal?: string;
}