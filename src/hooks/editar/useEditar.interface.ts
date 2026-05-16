import { Dispatch, SetStateAction } from "react";
import { ClienteProp } from "../../modelo/Entidades/cliente/cliente.interface";
import { LibroProp } from "../../modelo/Entidades/libro/libro.interface";
import { PedidoProp } from "../../modelo/Entidades/pedido/pedido.interface";
import { SedeProp } from "../../modelo/Entidades/sede/sede.interface";
import { PrecioProp } from "../../modelo/Entidades/precio/precio.interface";

interface Props {
  ruta?: string;
  setModalLocal?: Dispatch<SetStateAction<boolean>>;
}

export interface PropEditar extends Props {
  cliente?: ClienteProp;
  libro?: LibroProp;
  pedido?: PedidoProp;
  sede?: SedeProp;
  precio?: PrecioProp;
}