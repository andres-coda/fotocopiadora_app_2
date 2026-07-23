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
import { PropuestaProp } from "../../modelo/Entidades/propuesta/propuesta.interface";
import { PaginadoProp } from "../../adaptadores/entrada/paginado.adapter";


export interface crearContextProp {
  libros?: PaginadoProp<LibroProp>;
  clientes?: PaginadoProp<ClienteProp>;
  especificaciones?: EspecificacionProp[];
  materias?: MateriaProp[];
  pedidos?: PedidoProp[];
  pedidoLibros?: PedidoLibroProp[];
  precios?: PaginadoProp<PrecioProp>;
  sedes?: PaginadoProp<SedeProp>;
  componentes?: ComponenteProp[];
  propuestas?:PaginadoProp<PropuestaProp>;

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