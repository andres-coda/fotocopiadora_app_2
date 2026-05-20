import { Dispatch, SetStateAction } from "react";
import { ClienteProp } from "../../modelo/Entidades/cliente/cliente.interface";
import { LibroProp } from "../../modelo/Entidades/libro/libro.interface";
import { PedidoClienteProp } from "../../modelo/Entidades/pedido/pedido.interface";
import { SedeProp } from "../../modelo/Entidades/sede/sede.interface";
import { PrecioProp } from "../../modelo/Entidades/precio/precio.interface";

export interface PropEditar<P extends PedidoClienteProp>{
  cliente?: ClienteProp;
  libro?: LibroProp;
  pedido?: P;
  sede?: SedeProp;
  precio?: PrecioProp;
}

export interface PropEditarCompleto<P extends PedidoClienteProp> extends PropEditar<P> {
  ruta?: string;
  setModalLocal?: Dispatch<SetStateAction<boolean>>;
}

export interface HandleSelectProp<P extends PedidoClienteProp> extends PropEditar<P>{
  rutaLocal?: string;
}