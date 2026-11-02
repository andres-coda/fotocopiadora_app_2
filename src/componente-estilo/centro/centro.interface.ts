import { ReactNode, RefObject } from "react";

export interface CentroDefectoProp {
  // Lo que sea que vaya en el children, estara en grid.
  children?: ReactNode;
  // El texto simboliza un titulo, va encima del centro, los estilos son del titulo base
  texto?: string;
  //error al hacer peticion a la api
  error?: string | null;
  //Loading para saber si la petición fue enviada y esta cargando los datos
  loading?: boolean;
  //El nuevo estilo aplica al centro interior, el que va con grid
  nuevoEstilo?: string;
}

export interface CentroProp extends CentroDefectoProp {
  //El nuevo estilo aplica al centro interior, el que va con grid
  nuevoEstilo?: string;
  //Hace referencia al final de la lista.
  finListaRef?: RefObject<HTMLDivElement>;
  //Se utiliza para nombrar cuando no hay elementos en la lista
  entidad?: string;
  //Se utiliza para poner el texto de que no hay elementos en la lista, es condicion
  //de los datos que van en el children
  vacio?: boolean;
  //La query es para especificar que no hay coincidencias con la busqueda, simepre que no haya elementos
  query?: string;
  //Igual que query
  filtro?: boolean;
}