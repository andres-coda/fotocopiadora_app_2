import { Dispatch, ReactNode } from "react";
import { UnknownAction } from "@reduxjs/toolkit";
import { LibroProp } from "../../modelo/Entidades/libro/libro.interface";
import { ClienteProp } from "../../modelo/Entidades/cliente/cliente.interface";
import { EspecificacionProp } from "../../modelo/Entidades/especificacion/especificacion.interface";
import { MateriaProp } from "../../modelo/Entidades/libro/materia.interface";
import { PedidoProp } from "../../modelo/Entidades/pedido/pedido.interface";
import { PedidoLibroProp } from "../../modelo/Entidades/pedido_libro/pedidoLibro.interface";
import { PrecioProp } from "../../modelo/Entidades/precio/precio.interface";
import { SedeProp } from "../../modelo/Entidades/sede/sede.interface";
import { ComponenteProp } from "../../modelo/Entidades/libro/componente.interface";


export interface crearContextProp {
  libros?: LibroProp[];
  clientes?: ClienteProp[];
  especificaciones?: EspecificacionProp[];
  materias?: MateriaProp[];
  pedidos?: PedidoProp[];
  pedidoLibros?: PedidoLibroProp[];
  precios?: PrecioProp[];
  sedes?: SedeProp[];
  componentes?: ComponenteProp[];

  libro?: LibroProp,
  cliente?: ClienteProp;
  especificacione?: EspecificacionProp;
  materia?: MateriaProp;
  pedido?: PedidoProp;
  pedidoLibro?: PedidoLibroProp;
  precio?: PrecioProp;
  sede?: SedeProp;

  dispatch: Dispatch<UnknownAction>;
}

export interface AppProp {
  children: ReactNode;
}